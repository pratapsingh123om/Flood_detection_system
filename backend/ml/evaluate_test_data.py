import pandas as pd
import numpy as np
import logging
import os
from ml.load_model import load_ml_model
from ml.preprocess import get_test_features

def evaluate_test_data(model_name: str) -> list:
    """
    Evaluates the July-August test dataset using the specified model.
    Returns a list of dicts with date, actual, and predicted rainfall.
    """
    model = load_ml_model(model_name)
    
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    historical_csv = os.path.join(base_dir, "Data", "data", "indore-rainfall-data.csv")
    test_csv = os.path.join(base_dir, "Data", "data", "july_data", "indore-rainfall-data-test.csv")
    
    X_test, y_actual, dates = get_test_features(historical_csv, test_csv)
    
    results = []
    
    for i in range(len(X_test)):
        row = X_test.iloc[[i]].copy()
        date_str = dates.iloc[i].strftime("%d-%b")
        actual_rain = float(y_actual.iloc[i])
        
        predicted_rain = 0.0
        
        if model is not None:
            try:
                if isinstance(model, dict):
                    # Hybrid Dictionary Pipeline
                    clf = model.get("clf") or model.get("stage1_clf")
                    reg = model.get("reg") or model.get("stage2_asym_reg") or model.get("stage2_reg")
                    thresh = model.get("threshold", 0.45)
                    
                    prob = clf.predict_proba(row)[0, 1]
                    raw_pred = reg.predict(row)[0]
                    predicted_rain = raw_pred if prob >= thresh else 0.0
                else:
                    # Standard model
                    pred = model.predict(row)
                    predicted_rain = float(pred[0]) if isinstance(pred, (list, np.ndarray)) else float(pred)
                    
                predicted_rain = max(0.0, predicted_rain)
            except Exception as e:
                logging.warning(f"Prediction failed on {date_str}: {e}")
                predicted_rain = 0.0
                
        results.append({
            "date": date_str,
            "actual": round(actual_rain, 1),
            "predicted": round(predicted_rain, 1),
            "threshold": 30.0 # Extreme rain threshold for graphing
        })
        
    return results
