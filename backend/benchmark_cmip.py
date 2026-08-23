import os
import sys
import numpy as np
import pandas as pd
import math

# Ensure numpy compatibility
if hasattr(np, "core"):
    sys.modules['numpy._core'] = np.core
    if hasattr(np.core, "multiarray"):
        sys.modules['numpy._core.multiarray'] = np.core.multiarray
    if hasattr(np.core, "_multiarray_umath"):
        sys.modules['numpy._core._multiarray_umath'] = np.core._multiarray_umath

def moderated_asymmetric_loss(y_true, y_pred): pass
def asymmetric_heavy_rain_loss(y_true, y_pred): pass
import __main__
setattr(__main__, "moderated_asymmetric_loss", moderated_asymmetric_loss)
setattr(__main__, "asymmetric_heavy_rain_loss", asymmetric_heavy_rain_loss)

from ml.predict_climate import predict_cmip6_climate

def benchmark_cmip6():
    models = [
        ("upgraded_extreme_hybrid_pipeline", "Upgraded 3-Stage Extreme Hybrid (Spatial U-Net + Gated Regressors)"),
        ("xgboost_model", "Extreme Gradient Boosted Tree (XGBoost Regressor)"),
        ("randomforest_model", "Physics-Augmented Random Forest Regressor"),
        ("tuned_asym_hybrid", "Tuned Asymmetric Hybrid (Asymmetric Heavy Rain Loss)")
    ]
    
    cmip_baselines = ["MPI_ESM1_2_XR", "MRI_ESM2_0", "EC_Earth3_Veg"]
    
    print("=" * 80)
    print("CMIP6 CLIMATE MATCHING BENCHMARK (SSP5-8.5 2027 PROJECTION)")
    print("=" * 80)
    
    cmip_results = []
    
    for model_key, model_display in models:
        total_matching = 0
        total_rmse = 0
        total_corr = 0
        
        for baseline in cmip_baselines:
            try:
                res = predict_cmip6_climate(model_name=model_key, location="Indore", timeframe="year", baseline_model=baseline)
                if not res:
                    continue
                actuals = np.array([r['actual'] for r in res])
                preds = np.array([r['predicted'] for r in res])
                
                mae = np.mean(np.abs(preds - actuals))
                mean_act = np.mean(actuals)
                matching_pct = max(0.0, 100.0 - ((mae / (mean_act + 1e-5)) * 100.0))
                rmse = math.sqrt(np.mean((preds - actuals) ** 2))
                corr = np.corrcoef(actuals, preds)[0, 1] if np.std(preds) > 0 and np.std(actuals) > 0 else 0.0
                
                total_matching += matching_pct
                total_rmse += rmse
                total_corr += max(0.0, corr)
            except Exception as e:
                print(f"Error on {model_key} with {baseline}: {e}")
                
        avg_matching = total_matching / len(cmip_baselines)
        avg_rmse = total_rmse / len(cmip_baselines)
        avg_corr = total_corr / len(cmip_baselines)
        
        cmip_results.append({
            "model_key": model_key,
            "display_name": model_display,
            "cmip_matching_pct": round(avg_matching, 1),
            "cmip_rmse": round(avg_rmse, 2),
            "cmip_corr": round(avg_corr, 3)
        })
        
        print(f"\n[MODEL] {model_display}")
        print(f"   -> CMIP6 Baseline Matching: {avg_matching:.1f}%")
        print(f"   -> CMIP6 Scenario RMSE: {avg_rmse:.2f} mm")
        print(f"   -> Climate Signal Correlation: {avg_corr:.3f}")
        
    cmip_results.sort(key=lambda x: (x['cmip_matching_pct'], x['cmip_corr']), reverse=True)
    
    print("\n" + "=" * 80)
    print("FINAL TOP 3 PREDICTION & CMIP MATCHING MODELS:")
    print("=" * 80)
    for rank, r in enumerate(cmip_results[:3], 1):
        print(f"#{rank} -> {r['display_name']} [{r['model_key']}]")
        print(f"      CMIP Matching: {r['cmip_matching_pct']}% | Scenario RMSE: {r['cmip_rmse']} mm | Correlation: {r['cmip_corr']}")
        
    return cmip_results

if __name__ == "__main__":
    benchmark_cmip6()
