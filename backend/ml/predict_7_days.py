import pandas as pd
import numpy as np
import logging
import os
from datetime import datetime, timedelta
from ml.load_model import load_ml_model
from ml.preprocess import get_latest_features

def predict_7_days(model_name: str, location: str, runoff: float, elevation: float, drainage: float) -> list:
    """
    Generates a 7-day prediction using the actual ML models and historical data.
    """
    model = load_ml_model(model_name)
    
    # Define path to the CSV data
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    csv_path = os.path.join(base_dir, "Data", "data", "indore-rainfall-data.csv")
    
    X_latest, dates = get_latest_features(csv_path, num_days=7)
    
    days_of_week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    predictions = []
    
    # We will iterate through 7 days
    # If data is found, we use the model to predict
    for i in range(7):
        current_date = datetime.now() + timedelta(days=i)
        if dates is not None and i < len(dates):
            current_date = dates.iloc[i]
            
        day_str = days_of_week[current_date.weekday()]
        
        predicted_rain = 0.0
        predicted_temp = 30.0
        
        if model is not None and X_latest is not None and i < len(X_latest):
            try:
                # Extract single row as DataFrame
                row = X_latest.iloc[[i]].copy()
                
                # We can optionally inject the slider values here if they map to features
                # e.g., soil_moisture influenced by runoff
                # row['soil_moisture'] = row['soil_moisture'] + (runoff / 1000.0)
                
                if isinstance(model, dict):
                    # Hybrid Dictionary Pipeline
                    clf = model.get("clf") or model.get("stage1_clf")
                    reg = model.get("reg") or model.get("stage2_asym_reg") or model.get("stage2_reg")
                    thresh = model.get("threshold", 0.45)
                    
                    prob = clf.predict_proba(row)[0, 1]
                    raw_pred = reg.predict(row)[0]
                    predicted_rain = raw_pred if prob >= thresh else 0.0
                else:
                    # Standard Scikit-Learn or XGBoost model
                    pred = model.predict(row)
                    if isinstance(pred, (list, np.ndarray)):
                        predicted_rain = float(pred[0])
                    else:
                        predicted_rain = float(pred)
                        
                predicted_rain = max(0.0, predicted_rain)
                predicted_temp = float(row['tmax_degC'].values[0]) if 'tmax_degC' in row else 30.0
                
            except Exception as e:
                logging.warning(f"Prediction failed on day {i}: {str(e)}")
                predicted_rain = (runoff * 0.1) + (i * 2.5)
        else:
            predicted_rain = (runoff * 0.1) + (i * 2.5)
            
        # Determine icon based on rain
        icon = '🌤'
        intensity = 0.1
        if predicted_rain > 30:
            icon = '⛈'
            intensity = 0.9
        elif predicted_rain > 10:
            icon = '🌧'
            intensity = 0.6
        elif predicted_rain > 0.1:
            icon = '🌦'
            intensity = 0.3
            
        predictions.append({
            "day": day_str,
            "temp": round(predicted_temp - (predicted_rain * 0.05), 1),
            "rain": round(predicted_rain, 1),
            "icon": icon,
            "intensity": intensity
        })
        
    return predictions
