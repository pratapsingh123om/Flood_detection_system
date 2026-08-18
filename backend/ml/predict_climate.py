import pandas as pd
import numpy as np
import datetime
import requests
import logging
import math
import os
from ml.load_model import load_ml_model
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
    
    df_raw = fetch_cmip6_data(lat, lon, start_date, end_date, baseline_model)
    if baseline_model != "MPI_ESM1_2_XR":
        try:
            df_default = fetch_cmip6_data(lat, lon, start_date, end_date, "MPI_ESM1_2_XR")
        except:
            df_default = df_raw.copy()
    else:
        df_default = df_raw.copy()
    
    # Map CMIP6 variables to our pipeline's expected base variables
    df = pd.DataFrame()
    df['date'] = df_raw['time']
    df['rainfall_mm'] = df_raw['precipitation_sum'].fillna(0.0)
    df['tmax_degC'] = df_raw['temperature_2m_max']
    df['tmin_degC'] = df_raw['temperature_2m_min']
    df['wind_speed_ms'] = df_raw['wind_speed_10m_max'] / 3.6 # km/h to m/s
    
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
    
    # Filter only the requested visualization dates
    df_proc = df_proc[(df_proc['date'] >= pd.to_datetime(viz_start)) & (df_proc['date'] <= pd.to_datetime(viz_end))].reset_index(drop=True)
    
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
import pandas as pd
import numpy as np
import datetime
import requests
import logging
import math
import os
from ml.load_model import load_ml_model
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
    Fetches CMIP6 baseline data for specific timeframes to be used as reference lines.
    (AI predictions are handled separately to decouple them from CMIP data).
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
    
    # df_selected is the dropdown choice, df_default is the standard MPI_ESM1_2_XR
    df_selected = fetch_cmip6_data(lat, lon, start_date, end_date, baseline_model)
    if baseline_model != "MPI_ESM1_2_XR":
        try:
            df_default = fetch_cmip6_data(lat, lon, start_date, end_date, "MPI_ESM1_2_XR")
        except:
            df_default = df_selected.copy()
    else:
        df_default = df_selected.copy()
    
    # Filter only the requested visualization dates
    df_selected['date'] = pd.to_datetime(df_selected['time'])
    df_default['date'] = pd.to_datetime(df_default['time'])
    
    df_selected = df_selected[(df_selected['date'] >= pd.to_datetime(viz_start)) & (df_selected['date'] <= pd.to_datetime(viz_end))].reset_index(drop=True)
    df_default = df_default[(df_default['date'] >= pd.to_datetime(viz_start)) & (df_default['date'] <= pd.to_datetime(viz_end))].reset_index(drop=True)
    
    results = []
    
    for idx, row in df_default.iterrows():
        # The 'actual' field in the frontend maps to the chosen dropdown baseline
        # The 'default_cmip' field maps to the standard MPI_ESM baseline
        d_str = row['date'].strftime("%d-%b")
        selected_cmip_val = df_selected.iloc[idx]['precipitation_sum'] if pd.notna(df_selected.iloc[idx]['precipitation_sum']) else 0.0
        default_cmip_val = row['precipitation_sum'] if pd.notna(row['precipitation_sum']) else 0.0

        results.append({
            "date": d_str,
            "predicted": 0.0, # Placeholder, will be overwritten by the true AI model in router.py
            "actual": round(selected_cmip_val, 1), # The dropdown chosen model
            "default_cmip": round(default_cmip_val, 1), # The standard CMIP6 model
            "threshold": 30.0
        })
        
    return results
