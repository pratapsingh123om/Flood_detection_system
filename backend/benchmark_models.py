import os
import sys
import numpy as np
import pandas as pd
import math
import joblib

# Ensure numpy compatibility
if hasattr(np, "core"):
    sys.modules['numpy._core'] = np.core
    if hasattr(np.core, "multiarray"):
        sys.modules['numpy._core.multiarray'] = np.core.multiarray
    if hasattr(np.core, "_multiarray_umath"):
        sys.modules['numpy._core._multiarray_umath'] = np.core._multiarray_umath

# Define custom loss dummies for unpickling
def moderated_asymmetric_loss(y_true, y_pred): pass
def asymmetric_heavy_rain_loss(y_true, y_pred): pass
import __main__
setattr(__main__, "moderated_asymmetric_loss", moderated_asymmetric_loss)
setattr(__main__, "asymmetric_heavy_rain_loss", asymmetric_heavy_rain_loss)

from ml.preprocess import preprocess_dataset
from ml.local_inference import run_local_inference, load_local_model

def evaluate_model_on_data(model_name: str, df: pd.DataFrame):
    df_proc = preprocess_dataset(df)
    feature_cols = [c for c in df_proc.columns if c not in ['date', 'rainfall_mm', 'month', 'day']]
    X = df_proc[feature_cols]
    y_actual = df_proc['rainfall_mm'].values
    
    y_pred = run_local_inference(model_name, X)
    
    threshold = 10.0
    ext_threshold = 30.0
    
    tp = tn = fp = fn = 0
    ext_tp = ext_tn = ext_fp = ext_fn = 0
    se = sae = 0
    n = len(y_actual)
    mean_act = np.mean(y_actual)
    
    nse_num = 0
    nse_den = 0
    
    for act, pred in zip(y_actual, y_pred):
        se += (act - pred) ** 2
        sae += abs(act - pred)
        nse_num += (act - pred) ** 2
        nse_den += (act - mean_act) ** 2
        
        # Heavy rain >= 10mm
        if act >= threshold and pred >= threshold: tp += 1
        elif act < threshold and pred < threshold: tn += 1
        elif act < threshold and pred >= threshold: fp += 1
        elif act >= threshold and pred < threshold: fn += 1
        
        # Extreme rain >= 30mm
        if act >= ext_threshold and pred >= ext_threshold: ext_tp += 1
        elif act < ext_threshold and pred < ext_threshold: ext_tn += 1
        elif act < ext_threshold and pred >= ext_threshold: ext_fp += 1
        elif act >= ext_threshold and pred < ext_threshold: ext_fn += 1
        
    rmse = math.sqrt(se / n) if n > 0 else 0
    mae = sae / n if n > 0 else 0
    pod = tp / (tp + fn) if (tp + fn) > 0 else 0
    far = fp / (fp + tp) if (fp + tp) > 0 else 0
    csi = tp / (tp + fp + fn) if (tp + fp + fn) > 0 else 0
    ext_csi = ext_tp / (ext_tp + ext_fp + ext_fn) if (ext_tp + ext_fp + ext_fn) > 0 else 0
    ext_pod = ext_tp / (ext_tp + ext_fn) if (ext_tp + ext_fn) > 0 else 0
    nse = (1 - (nse_num / nse_den)) if nse_den > 0 else 0
    
    # Correlation with actual observations
    corr = np.corrcoef(y_actual, y_pred)[0, 1] if np.std(y_pred) > 0 and np.std(y_actual) > 0 else 0.0
    
    return {
        "model": model_name,
        "rmse": round(rmse, 2),
        "mae": round(mae, 2),
        "pod": round(pod, 4),
        "far": round(far, 4),
        "csi": round(csi, 4),
        "ext_csi": round(ext_csi, 4),
        "ext_pod": round(ext_pod, 4),
        "nse": round(nse, 3),
        "corr": round(corr, 3),
        "max_pred": round(float(np.max(y_pred)), 1),
        "max_actual": round(float(np.max(y_actual)), 1)
    }

def run_benchmarks():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    test_csv = os.path.join(base_dir, "Data", "data", "july_data", "indore-rainfall-data-test.csv")
    df_test = pd.read_csv(test_csv)
    
    candidate_models = [
        ("upgraded_extreme_hybrid_pipeline", "Upgraded 3-Stage Extreme Hybrid (Spatial U-Net + Gated Regressors)"),
        ("tuned_asym_hybrid", "Tuned Asymmetric Hybrid (Asymmetric Heavy Rain Loss)"),
        ("randomforest_model", "Physics-Augmented Random Forest Regressor"),
        ("xgboost_model", "Extreme Gradient Boosted Tree (XGBoost Regressor)")
    ]
    
    print("=" * 80)
    print("BENCHMARKING ALL MODELS: BASE TO ADVANCED HYBRID")
    print("=" * 80)
    
    results = []
    for model_key, model_display in candidate_models:
        try:
            res = evaluate_model_on_data(model_key, df_test)
            res["display_name"] = model_display
            results.append(res)
            print(f"\n[MODEL] {model_display}")
            print(f"   -> RMSE: {res['rmse']} mm | MAE: {res['mae']} mm | Correlation: {res['corr']}")
            print(f"   -> POD (Heavy): {res['pod']*100:.1f}% | FAR: {res['far']*100:.1f}% | CSI: {res['csi']:.3f}")
            print(f"   -> Extreme CSI (>30mm): {res['ext_csi']:.3f} | Extreme POD: {res['ext_pod']*100:.1f}%")
            print(f"   -> Peak Captured: {res['max_pred']} mm (Ground Truth Peak: {res['max_actual']} mm)")
            print(f"   -> NSE (Nash-Sutcliffe): {res['nse']}")
        except Exception as e:
            print(f"Error evaluating {model_key}: {e}")
            
    # Calculate composite score for ranking (balancing CSI, Extreme CSI, low FAR, low RMSE, high correlation)
    # Composite Score = (CSI * 30) + (Extreme_CSI * 35) + ((1 - FAR) * 20) + (Corr * 15)
    for r in results:
        comp_score = (r['csi'] * 30.0) + (r['ext_csi'] * 35.0) + ((1.0 - r['far']) * 20.0) + (max(0, r['corr']) * 15.0)
        r['composite_score'] = round(comp_score, 2)
        
    results.sort(key=lambda x: x['composite_score'], reverse=True)
    
    print("\n" + "=" * 80)
    print("TOP RANKED PREDICTION & CMIP MATCHING MODELS:")
    print("=" * 80)
    for rank, r in enumerate(results, 1):
        print(f"#{rank} [Score: {r['composite_score']}/100] -> {r['display_name']} ({r['model']})")
        print(f"    CSI: {r['csi']} | Ext CSI: {r['ext_csi']} | Low FAR: {r['far']} | RMSE: {r['rmse']}mm | NSE: {r['nse']}")
        
    return results

if __name__ == "__main__":
    run_benchmarks()
