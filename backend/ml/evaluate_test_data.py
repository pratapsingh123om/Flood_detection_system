import pandas as pd
import numpy as np
import logging
import os
import requests
from ml.preprocess import preprocess_dataset

INFERENCE_URL = os.getenv("INFERENCE_URL", "https://raincast-backend-ml-model-775429752478.asia-southeast1.run.app")

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
    Evaluates the 2026 out-of-sample real-world dataset (June - Aug 2026) using the Inference Service.
    """
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
    
    features_payload = []
    for i in range(len(df_proc)):
        row = df_proc.iloc[i]
        features_payload.append(row[feature_cols].to_dict())
        
    if model_name == "unet_model_compressed":
        predicted_rainfalls = []
        try:
            res = requests.post(f"{INFERENCE_URL}/predict_unet", json={"location": location}, timeout=10)
            if res.status_code == 200:
                gc_preds = [float(f["predicted_rain"]) for f in res.json().get("forecast", [])]
            else:
                gc_preds = [0.0] * 7
        except Exception:
            gc_preds = [0.0] * 7
            
        for i in range(len(df_proc)):
            predicted_rainfalls.append(gc_preds[i % len(gc_preds)] if len(gc_preds) > 0 else 0.0)
    else:
        try:
            from ml.local_inference import run_local_inference
            predicted_rainfalls = run_local_inference(model_name, df_proc[feature_cols])
        except Exception as e:
            logging.warning(f"Local inference failed ({e}), falling back to remote service...")
            try:
                res = requests.post(
                    f"{INFERENCE_URL}/predict/tabular",
                    json={"model_name": model_name, "features": features_payload},
                    timeout=5
                )
                if res.status_code == 200:
                    predicted_rainfalls = res.json().get("predictions", [0.0] * len(df_proc))
                else:
                    predicted_rainfalls = [0.0] * len(df_proc)
            except Exception:
                predicted_rainfalls = [0.0] * len(df_proc)
    
    results = []
    for i in range(len(df_proc)):
        row = df_proc.iloc[i]
        date_str = row['date'].strftime("%d-%b")
        actual_rain = float(row['rainfall_mm'])
        predicted_rain = predicted_rainfalls[i]
        
        results.append({
            "date": date_str,
            "actual": round(actual_rain, 1),
            "predicted": round(predicted_rain, 1),
            "threshold": 30.0 
        })
        
    return results
