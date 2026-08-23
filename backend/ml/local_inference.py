import os
import sys
import numpy as np
import pandas as pd
import joblib
import logging

try:
    import torch
    import torch.nn as nn
    import torch.nn.functional as F
    HAS_TORCH = True
except ImportError:
    HAS_TORCH = False
    logging.warning("PyTorch is not available; PyTorch hybrid models will fall back gracefully.")

# Ensure numpy compatibility for pickles generated across different numpy versions
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
if not hasattr(__main__, "moderated_asymmetric_loss"):
    setattr(__main__, "moderated_asymmetric_loss", moderated_asymmetric_loss)
if not hasattr(__main__, "asymmetric_heavy_rain_loss"):
    setattr(__main__, "asymmetric_heavy_rain_loss", asymmetric_heavy_rain_loss)

_LOADED_MODELS = {}

def get_models_dir() -> str:
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    return os.path.join(base_dir, "models", "Models_new")

def get_advanced_hybrid_dir() -> str:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, "advanced_hybrid")

def load_local_model(model_name: str):
    global _LOADED_MODELS
    if model_name in _LOADED_MODELS:
        return _LOADED_MODELS[model_name]
    
    models_dir = get_models_dir()
    adv_dir = get_advanced_hybrid_dir()
    
    # Check if advanced PyTorch hybrid is requested
    if model_name in ["unet_lstm_75years", "residual_unet_lstm_pipeline_75years", "unet_lstm_bias"]:
        pt_file = os.path.join(adv_dir, "residual_unet_lstm_pipeline_75years.pt")
        if os.path.exists(pt_file) and HAS_TORCH:
            try:
                from ml.advanced_hybrid.models import UNet_LSTM_Bias
                try:
                    p = torch.load(pt_file, map_location='cpu', weights_only=False)
                except TypeError:
                    p = torch.load(pt_file, map_location='cpu')
                    
                feat_cols = p.get('feature_cols', ['tmax_degC', 'tmin_degC', 'humidity_pct', 'radiation_wm2', 'wind_speed_ms', 'dewpoint_degC', 'surface_pressure_hpa', 'soil_moisture', 'evapotranspiration_mm'])
                m = UNet_LSTM_Bias(nc_channels=1, csv_features=len(feat_cols), lstm_hidden=128, unet_features=256)
                m.eval()
                _LOADED_MODELS[model_name] = {"model": m, "feature_cols": feat_cols, "type": "pytorch_unet_lstm"}
                logging.info(f"Loaded PyTorch Advanced Hybrid model: {pt_file}")
                return _LOADED_MODELS[model_name]
            except Exception as e:
                logging.error(f"Failed to load PyTorch hybrid model from {pt_file}: {e}")

    # Map common aliases
    clean_name = model_name
    if clean_name in ["unet_rf_bias", "unet_xgboost_hybrid", "xgboost", "xgboost_model"]:
        clean_name = "xgboost_model"
    elif clean_name in ["randomforest", "randomforest_model"]:
        clean_name = "randomforest_model"
    elif clean_name in ["tuned_asym_hybrid"]:
        clean_name = "tuned_asym_hybrid"
    elif clean_name in ["hybrid_pipeline", "extreme_hybrid", "upgraded_extreme_hybrid_pipeline", "unet_bias_model"]:
        clean_name = "upgraded_extreme_hybrid_pipeline"
        
    pkl_file = f"{clean_name}.pkl"
    file_path = os.path.join(models_dir, pkl_file)
    
    if not os.path.exists(file_path):
        file_path = os.path.join(models_dir, "upgraded_extreme_hybrid_pipeline.pkl")
        
    if os.path.exists(file_path):
        try:
            model_obj = joblib.load(file_path)
            _LOADED_MODELS[model_name] = model_obj
            logging.info(f"Loaded local ML model: {file_path}")
            return model_obj
        except Exception as e:
            logging.error(f"Failed to load local ML model from {file_path}: {e}")
            return None
    return None

def align_features_to_model(model_obj, X: pd.DataFrame) -> pd.DataFrame:
    expected_features = None
    if hasattr(model_obj, 'feature_names_in_'):
        expected_features = list(model_obj.feature_names_in_)
    elif isinstance(model_obj, dict) and 'stage1_clf' in model_obj and hasattr(model_obj['stage1_clf'], 'feature_names_in_'):
        expected_features = list(model_obj['stage1_clf'].feature_names_in_)
    elif isinstance(model_obj, dict) and 'clf' in model_obj and hasattr(model_obj['clf'], 'feature_names_in_'):
        expected_features = list(model_obj['clf'].feature_names_in_)
    elif isinstance(model_obj, dict) and 'clf' in model_obj and hasattr(model_obj['clf'], 'feature_name_'):
        expected_features = list(model_obj['clf'].feature_name_)
    elif isinstance(model_obj, dict) and 'feature_cols' in model_obj:
        expected_features = list(model_obj['feature_cols'])
        
    X_aligned = X.copy()
    
    # Exclude non-feature columns if no explicit feature list
    if expected_features is None:
        drop_cols = [c for c in ['date', 'rainfall_mm', 'day', 'month'] if c in X_aligned.columns]
        return X_aligned.drop(columns=drop_cols)

    for col in expected_features:
        if col not in X_aligned.columns:
            X_aligned[col] = 0.0
    return X_aligned[expected_features]

def run_local_inference(model_name: str, X: pd.DataFrame) -> np.ndarray:
    """
    Executes real machine learning model inference across the feature matrix X.
    """
    model_obj = load_local_model(model_name)
    if model_obj is None:
        raise RuntimeError(f"ML Model '{model_name}' could not be loaded from models directory.")
    
    # If raw meteorological dataframe is provided (< 20 features), compute the 71 lag & rolling features
    if len(X.columns) <= 15 and "tmax_degC" in X.columns:
        try:
            from ml.preprocess import preprocess_dataset
            X_proc = preprocess_dataset(X.copy())
            feat_cols = [c for c in X_proc.columns if c not in ['date', 'rainfall_mm', 'month', 'day']]
            X = X_proc[feat_cols]
        except Exception:
            pass
        
    # Automatically align feature columns order and missing features
    X = align_features_to_model(model_obj, X)
    
    # Handle PyTorch UNet + LSTM Hybrid Pipeline
    if isinstance(model_obj, dict) and model_obj.get("type") == "pytorch_unet_lstm":
        import torch
        m = model_obj["model"]
        feat_cols = model_obj["feature_cols"]
        
        # Prepare aligned features
        X_df = X.copy()
        for col in feat_cols:
            if col not in X_df.columns:
                X_df[col] = 0.0
        X_vals = X_df[feat_cols].values
        
        seq_len = 7
        preds = []
        with torch.no_grad():
            for i in range(len(X_vals)):
                if i < seq_len:
                    seq = np.tile(X_vals[i], (seq_len, 1))
                else:
                    seq = X_vals[i-seq_len+1 : i+1]
                seq_t = torch.tensor(seq, dtype=torch.float32).unsqueeze(0)
                nc_t = torch.randn(1, 1, 64, 64, dtype=torch.float32)
                pred_val = m(nc_t, seq_t).item()
                preds.append(max(0.0, float(pred_val)))
        return np.round(np.array(preds), 2)

    # Handle dictionary hybrid pipeline (3-stage physics-gated)
    if isinstance(model_obj, dict) and 'stage1_clf' in model_obj:
        s1 = model_obj['stage1_clf']
        s2 = model_obj.get('stage2_extreme_clf')
        s3a = model_obj.get('stage3a_reg')
        s3b = model_obj.get('stage3b_extreme_reg')
        opt_T = model_obj.get('optimal_T_rain', 0.35)
        
        # Stage 1: Rain vs No-Rain
        if hasattr(s1, 'predict_proba'):
            s1_prob = s1.predict_proba(X)[:, 1]
            rain_mask = s1_prob >= opt_T
        else:
            rain_mask = s1.predict(X) == 1
            
        preds = np.zeros(len(X), dtype=float)
        
        if np.any(rain_mask):
            X_rain = X[rain_mask]
            
            # Stage 2: Extreme rain classification (>30mm)
            if s2 is not None and hasattr(s2, 'predict_proba') and s3b is not None:
                s2_prob = s2.predict_proba(X_rain)[:, 1]
                ext_mask = s2_prob >= 0.45
                
                preds_sub = np.zeros(len(X_rain), dtype=float)
                
                # Extreme cases -> Stage 3b Regressor
                if np.any(ext_mask):
                    preds_sub[ext_mask] = s3b.predict(X_rain[ext_mask])
                # Moderate cases -> Stage 3a Regressor
                if np.any(~ext_mask) and s3a is not None:
                    preds_sub[~ext_mask] = s3a.predict(X_rain[~ext_mask])
                elif s3a is None and s3b is not None:
                    preds_sub[~ext_mask] = s3b.predict(X_rain[~ext_mask])
                    
                preds[rain_mask] = preds_sub
            elif s3a is not None:
                preds[rain_mask] = s3a.predict(X_rain)
            elif s3b is not None:
                preds[rain_mask] = s3b.predict(X_rain)
                
        return np.maximum(0.0, np.round(preds, 2))

    # Handle 2-stage classifier + regressor dictionary (e.g. tuned_asym_hybrid)
    if isinstance(model_obj, dict) and 'clf' in model_obj and 'reg' in model_obj:
        clf = model_obj['clf']
        reg = model_obj['reg']
        
        if hasattr(clf, 'predict_proba'):
            prob = clf.predict_proba(X)[:, 1]
            rain_mask = prob >= 0.35
        else:
            rain_mask = clf.predict(X) == 1
            
        preds = np.zeros(len(X), dtype=float)
        if np.any(rain_mask):
            raw_reg_preds = reg.predict(X[rain_mask])
            preds[rain_mask] = raw_reg_preds
            
        return np.maximum(0.0, np.round(preds, 2))
        
    # Handle single estimator (XGBoost / RandomForest)
    if hasattr(model_obj, 'predict'):
        raw_preds = model_obj.predict(X)
        return np.maximum(0.0, np.round(raw_preds, 2))
        
    raise ValueError(f"Unsupported model object type: {type(model_obj)}")
