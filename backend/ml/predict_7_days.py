import pandas as pd
import numpy as np
import logging
import os
import requests
from datetime import datetime, timedelta
from ml.preprocess import get_latest_features

INFERENCE_URL = os.getenv("INFERENCE_URL", "http://localhost:8000")

def predict_7_days(model_name: str, location: str, runoff: float, elevation: float, drainage: float) -> list:
    """
    Generates a 7-day prediction using the actual ML models and historical data.
    """
    
    # Define path to the CSV data
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    csv_path = os.path.join(base_dir, "Data", "data", "july_data", "indore-rainfall-data-test.csv")
    
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
        is_fallback = False
        
        if X_latest is not None and i < len(X_latest):
            try:
                row = X_latest.iloc[[i]].copy()
                
                res = requests.post(
                    f"{INFERENCE_URL}/predict/tabular",
                    json={"model_name": model_name, "features": [row.iloc[0].to_dict()]},
                    timeout=5
                )
                if res.status_code == 200:
                    predicted_rain = res.json().get("predictions", [0.0])[0]
                else:
                    logging.error(f"Inference Service failed: {res.text}")
                    predicted_rain = 0.0
                    is_fallback = True
                        
                predicted_rain = max(0.0, float(predicted_rain))
                predicted_temp = float(row['tmax_degC'].values[0]) if 'tmax_degC' in row else 30.0
                
            except Exception as e:
                logging.warning(f"Prediction failed on day {i}: {str(e)}")
                predicted_rain = (runoff * 0.1) + (i * 2.5)
                is_fallback = True
        else:
            predicted_rain = (runoff * 0.1) + (i * 2.5)
            is_fallback = True
            
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
            "intensity": intensity,
            "is_fallback": is_fallback
        })
        
    return predictions
