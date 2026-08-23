import os
import sys
import numpy as np
import pandas as pd
import joblib
import logging

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

def load_local_model(model_name: str):
    global _LOADED_MODELS
    if model_name in _LOADED_MODELS:
        return _LOADED_MODELS[model_name]
    
    models_dir = get_models_dir()
    
    # Map common aliases
    clean_name = model_name
    if clean_name in ["unet_lstm_bias", "unet_rf_bias", "unet_bias_model", "hybrid_pipeline", "extreme_hybrid", "upgraded_extreme_hybrid_pipeline"]:
        clean_name = "upgraded_extreme_hybrid_pipeline"
    elif clean_name in ["xgboost", "xgboost_model"]:
        clean_name = "xgboost_model"
    elif clean_name in ["randomforest", "randomforest_model"]:
        clean_name = "randomforest_model"
    elif clean_name in ["tuned_asym_hybrid"]:
        clean_name = "tuned_asym_hybrid"
        
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

def run_local_inference(model_name: str, X: pd.DataFrame) -> np.ndarray:
    """
    Executes real machine learning model inference across the feature matrix X.
    """
    model_obj = load_local_model(model_name)
    if model_obj is None:
        raise RuntimeError(f"ML Model '{model_name}' could not be loaded from models directory.")
    
    # Handle dictionary hybrid pipeline
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
        
    # Handle single estimator (XGBoost / RandomForest)
    if hasattr(model_obj, 'predict'):
        raw_preds = model_obj.predict(X)
        return np.maximum(0.0, np.round(raw_preds, 2))
        
    raise ValueError(f"Unsupported model object type: {type(model_obj)}")
