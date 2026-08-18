import pandas as pd
import numpy as np
import datetime
import requests
import logging
import math
import os
from ml.load_model import load_ml_model
from ml.preprocess import preprocess_dataset

def fetch_cmip6_data(lat: float, lon: float, start_date: str, end_date: str) -> pd.DataFrame:
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
        'models': 'MPI_ESM1_2_XR', # High resolution SSP5-8.5 model
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

def predict_cmip6_climate(model_name: str, location: str) -> list:
    """
    Predicts extreme weather events using CMIP6 baseline data for July-August 2027.
    """
    # Hardcoded Indore coordinates for this implementation
    lat, lon = 22.7196, 75.8577
    
    # We fetch a slightly longer window to allow for lag feature generation
    # We want predictions for July 1 to Aug 31.
    start_date = "2027-06-20"
    end_date = "2027-08-31"
    
    df_raw = fetch_cmip6_data(lat, lon, start_date, end_date)
    
    # Map CMIP6 variables to our pipeline's expected base variables
    df = pd.DataFrame()
    df['date'] = df_raw['time']
    df['rainfall_mm'] = df_raw['precipitation_sum'].fillna(0.0)
    df['tmax_degC'] = df_raw['temperature_2m_max']
    df['tmin_degC'] = df_raw['temperature_2m_min']
    df['wind_speed_ms'] = df_raw['wind_speed_10m_max'] / 3.6 # km/h to m/s
    
    # Impute missing variables for CMIP6 models
    # Humidity usually drops as temp rises. We can approximate it.
    df['humidity_pct'] = 80.0 - (df['tmax_degC'] - 25) * 2.0 
    df['humidity_pct'] = df['humidity_pct'].clip(40.0, 95.0)
    
    # Dewpoint approximation
    df['dewpoint_degC'] = df['tmin_degC'] - 1.5
    
    # Constants/Seasonal averages for missing CMIP variables
    df['radiation_wm2'] = 18.0 # typical monsoon cloudy day radiation
    df['surface_pressure_hpa'] = 945.0 # Indore elevation pressure
    df['soil_moisture'] = 0.45 # High during monsoon
    df['evapotranspiration_mm'] = 3.5
    
    # Process features
    df_proc = preprocess_dataset(df)
    
    # Filter only the requested visualization dates (July 1 to Aug 31)
    df_proc = df_proc[df_proc['date'] >= pd.to_datetime("2027-07-01")].reset_index(drop=True)
    
    # Load model
    model = load_ml_model(model_name)
    feature_cols = [c for c in df_proc.columns if c not in ['date', 'rainfall_mm']]
    
    results = []
    
    for idx, row in df_proc.iterrows():
        X_pred = pd.DataFrame([row[feature_cols]])
        
        predicted_rain = 0.0
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
                    raw_pred = reg.predict(X_pred)[0]
                    predicted_rain = raw_pred if prob >= thresh else 0.0
            else:
                pred = model.predict(X_pred)
                predicted_rain = float(pred[0]) if isinstance(pred, (list, np.ndarray)) else float(pred)
                
            predicted_rain = max(0.0, predicted_rain)
        except Exception as e:
            logging.warning(f"CMIP6 prediction failed: {e}")
            predicted_rain = 0.0
            
        results.append({
            "date": row['date'].strftime("%d-%b"),
            "predicted": round(predicted_rain, 1),
            "actual": round(row['rainfall_mm'], 1), # Raw CMIP6 Baseline
            "threshold": 30.0 # Extreme flood line
        })
        
    return results
