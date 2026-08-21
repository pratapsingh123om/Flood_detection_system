import pandas as pd
import numpy as np
import datetime
import requests
import logging
import math
import os
from ml.preprocess import preprocess_dataset

def fetch_cmip6_data(lat: float, lon: float, start_date: str, end_date: str, baseline_model: str = "MPI_ESM1_2_XR") -> pd.DataFrame:
    """
    Fetches SSP5-8.5 climate projection data from OpenMeteo Climate API.
    Uses MPI_ESM1_2_XR which provides daily temperature, precipitation, wind speed.
    """
    url = 'https://climate-api.open-meteo.com/v1/climate'
    params = {
        'latitude': lat,
        'longitude': lon,
        'start_date': start_date,
        'end_date': end_date,
        'models': baseline_model, # High resolution SSP5-8.5 model
        'daily': 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max'
    }
    
    res = requests.get(url, params=params, timeout=10)
    if res.status_code != 200:
        raise Exception(f"Failed to fetch CMIP6 data: {res.text}")
        
    data = res.json()
    daily = data.get('daily', {})
    
    if not daily or 'time' not in daily:
        raise Exception("Invalid CMIP6 data received")
        
    df = pd.DataFrame(daily)
    return df

def predict_cmip6_climate(model_name: str, location: str, timeframe: str = "year", baseline_model: str = "MPI_ESM1_2_XR") -> list:
    """
    Predicts extreme weather events using CMIP6 baseline data for specific timeframes.
    """
    # Hardcoded Indore coordinates for this implementation
    lat, lon = 22.7196, 75.8577
    
    # We fetch a slightly longer window to allow for lag feature generation
    if timeframe == "month":
        start_date = "2027-08-01"
        end_date = "2027-09-30"
        viz_start = "2027-08-15"
        viz_end = "2027-09-15"
    else:
        start_date = "2027-06-20"
        end_date = "2027-08-31"
        viz_start = "2027-07-01"
        viz_end = "2027-08-31"
    
    df_selected = fetch_cmip6_data(lat, lon, start_date, end_date, baseline_model)
    if baseline_model != "MPI_ESM1_2_XR":
        try:
            df_default = fetch_cmip6_data(lat, lon, start_date, end_date, "MPI_ESM1_2_XR")
        except:
            df_default = df_selected.copy()
    else:
        df_default = df_selected.copy()
    
    # Map CMIP6 variables to our pipeline's expected base variables
    df = pd.DataFrame()
    df['date'] = df_selected['time']
    df['rainfall_mm'] = df_selected['precipitation_sum'].fillna(0.0)
    df['tmax_degC'] = df_selected['temperature_2m_max']
    df['tmin_degC'] = df_selected['temperature_2m_min']
    df['wind_speed_ms'] = df_selected['wind_speed_10m_max'] / 3.6 # km/h to m/s
    
    # Impute missing variables for CMIP6 models
    # Humidity usually drops as temp rises. Mean is ~84% in Jul/Aug.
    df['humidity_pct'] = 84.0 - (df['tmax_degC'] - 28) * 1.5
    df['humidity_pct'] = df['humidity_pct'].clip(60.0, 98.0)
    
    # Dewpoint approximation (Mean is ~22C in Jul/Aug)
    df['dewpoint_degC'] = df['tmin_degC'] - 1.0
    
    # Constants/Seasonal averages for missing CMIP variables based on historical July/August
    df['radiation_wm2'] = 145.0 # True mean for Jul/Aug, not 18.0!
    df['surface_pressure_hpa'] = 941.8 
    df['soil_moisture'] = 0.45 
    df['evapotranspiration_mm'] = 2.9
    
    # Process features
    df_proc = preprocess_dataset(df)
    
    # Ensure dates match for filtering
    df_proc['date'] = pd.to_datetime(df_proc['date'])
    df_selected['date'] = pd.to_datetime(df_selected['time'])
    df_default['date'] = pd.to_datetime(df_default['time'])
    
    # Filter only the requested visualization dates
    mask_proc = (df_proc['date'] >= pd.to_datetime(viz_start)) & (df_proc['date'] <= pd.to_datetime(viz_end))
    df_proc = df_proc[mask_proc].reset_index(drop=True)
    
    mask_sel = (df_selected['date'] >= pd.to_datetime(viz_start)) & (df_selected['date'] <= pd.to_datetime(viz_end))
    df_selected = df_selected[mask_sel].reset_index(drop=True)
    
    mask_def = (df_default['date'] >= pd.to_datetime(viz_start)) & (df_default['date'] <= pd.to_datetime(viz_end))
    df_default = df_default[mask_def].reset_index(drop=True)
    
    INFERENCE_URL = os.getenv("INFERENCE_URL", "http://localhost:8000")
    
    # We will send all features at once to the inference service to speed up
    feature_cols = [c for c in df_proc.columns if c not in ['date', 'rainfall_mm']]
    features_payload = []
    for i in range(len(df_proc)):
        row = df_proc.iloc[i]
        features_payload.append(row[feature_cols].to_dict())
        
    try:
        res = requests.post(
            f"{INFERENCE_URL}/predict/tabular",
            json={"model_name": model_name, "features": features_payload},
            timeout=15
        )
        if res.status_code != 200:
            logging.error(f"Inference Service failed: {res.text}")
            predicted_rainfalls = [0.0] * len(df_proc)
        else:
            predicted_rainfalls = res.json().get("predictions", [0.0] * len(df_proc))
    except Exception as e:
        logging.error(f"Failed to connect to Inference Service: {e}")
        predicted_rainfalls = [0.0] * len(df_proc)
        
    results = []
    
    for i in range(len(df_proc)):
        row = df_proc.iloc[i]
        predicted_rain = predicted_rainfalls[i]
            
        d_str = row['date'].strftime("%d-%b")
        
        # Ensure we don't go out of bounds if CMIP shapes mismatch slightly
        if i < len(df_selected) and i < len(df_default):
            selected_cmip_val = df_selected.iloc[i]['precipitation_sum'] if pd.notna(df_selected.iloc[i]['precipitation_sum']) else 0.0
            default_cmip_val = df_default.iloc[i]['precipitation_sum'] if pd.notna(df_default.iloc[i]['precipitation_sum']) else 0.0
        else:
            selected_cmip_val = 0.0
            default_cmip_val = 0.0
        
        results.append({
            "date": d_str,
            "predicted": round(predicted_rain, 1),
            "actual": round(selected_cmip_val, 1),
            "default_cmip": round(default_cmip_val, 1),
            "threshold": 30.0
        })
        
    return results
