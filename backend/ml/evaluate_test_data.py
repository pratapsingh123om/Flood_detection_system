import pandas as pd
import numpy as np
import logging
import os
import requests
from ml.load_model import load_ml_model
from ml.preprocess import preprocess_dataset

def fetch_historical_2026(lat=22.7196, lon=75.8577, start_date="2026-06-01", end_date="2026-08-19"):
    # To keep dashboard fast, we will only fetch the critical monsoon months (June-August 2026)
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start_date,
        "end_date": end_date,
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
        "timezone": "Asia/Kolkata"
    }

    try:
        res = requests.get(url, params=params, timeout=10)
        if res.status_code != 200:
            raise Exception(f"Failed to fetch OpenMeteo data: {res.text}")
            
        data = res.json()
        daily = data.get("daily", {})
        
        df = pd.DataFrame({
            "date": pd.to_datetime(daily.get("time", [])),
            "temperature_2m_max": daily.get("temperature_2m_max", []),
            "temperature_2m_min": daily.get("temperature_2m_min", []),
            "precipitation_sum": daily.get("precipitation_sum", []),
            "wind_speed_10m_max": daily.get("wind_speed_10m_max", [])
        })
        return df
    except Exception as e:
        logging.error(f"Failed to fetch 2026 OpenMeteo data: {e}")
        return pd.DataFrame()

def evaluate_test_data(model_name: str) -> list:
    """
    Evaluates the 2026 out-of-sample real-world dataset (June - Aug 2026) using the specified model.
    """
    model = load_ml_model(model_name)
    df_raw = fetch_historical_2026()
    
    if df_raw.empty:
        return []
        
    df = pd.DataFrame()
    df['date'] = df_raw['date']
    df['rainfall_mm'] = df_raw['precipitation_sum'].fillna(0.0)
    df['tmax_degC'] = df_raw['temperature_2m_max']
    df['tmin_degC'] = df_raw['temperature_2m_min']
    df['wind_speed_ms'] = df_raw['wind_speed_10m_max'] / 3.6 
    
    df['humidity_pct'] = 84.0 - (df['tmax_degC'] - 28) * 1.5
    df['humidity_pct'] = df['humidity_pct'].clip(30.0, 98.0)
    df['dewpoint_degC'] = df['tmin_degC'] - 1.0
    
    df['radiation_wm2'] = 145.0
    df['surface_pressure_hpa'] = 941.8 
    df['soil_moisture'] = 0.45 
    df['evapotranspiration_mm'] = 2.9
    
    df_proc = preprocess_dataset(df)
    feature_cols = [c for c in df_proc.columns if c not in ['date', 'rainfall_mm', 'month', 'day']]
    
    results = []
    
    for i in range(len(df_proc)):
        row = df_proc.iloc[i]
        X_pred = pd.DataFrame([row[feature_cols]])
        date_str = row['date'].strftime("%d-%b")
        actual_rain = float(row['rainfall_mm'])
        
        predicted_rain = 0.0
        
        if model is not None:
            try:
                if isinstance(model, dict):
                    clf = model.get("clf") or model.get("stage1_clf")
                    
                    if "stage3a_reg" in model and "stage2_extreme_clf" in model:
                        thresh = model.get("optimal_T_rain", 0.45)
                        prob = clf.predict_proba(X_pred)[0, 1]
                        if prob < thresh:
                            predicted_rain = 0.0
                        else:
                            ext_prob = model["stage2_extreme_clf"].predict_proba(X_pred)[0, 1]
                            if ext_prob > 0.35:
                                predicted_rain = model["stage3b_extreme_reg"].predict(X_pred)[0] * 1.10
                            else:
                                predicted_rain = model["stage3a_reg"].predict(X_pred)[0]
                    else:
                        reg = model.get("reg") or model.get("stage2_asym_reg") or model.get("stage2_reg")
                        thresh = model.get("threshold", 0.45)
                        prob = clf.predict_proba(X_pred)[0, 1]
                        predicted_rain = reg.predict(X_pred)[0] if prob >= thresh else 0.0
                else:
                    pred = model.predict(X_pred)
                    predicted_rain = float(pred[0]) if isinstance(pred, (list, np.ndarray)) else float(pred)
                    
                predicted_rain = max(0.0, predicted_rain)
            except Exception as e:
                logging.warning(f"Prediction failed on {date_str}: {e}")
                predicted_rain = 0.0
                
        results.append({
            "date": date_str,
            "actual": round(actual_rain, 1),
            "predicted": round(predicted_rain, 1),
            "threshold": 30.0 
        })
        
    return results
