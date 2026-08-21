import pandas as pd
import numpy as np
import os
import datetime
import logging
import requests
from ml.preprocess import preprocess_dataset

INFERENCE_URL = os.getenv("INFERENCE_URL", "http://localhost:8000")

def predict_next_30_days(model_name: str, location: str, days: int = 30, start_date_str: str = None) -> list:
    """
    Autoregressively predicts rainfall for the next `days` starting from the end of the test dataset or a given date.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    historical_csv = os.path.join(base_dir, "Data", "data", "indore-rainfall-data.csv")
    test_csv = os.path.join(base_dir, "Data", "data", "july_data", "indore-rainfall-data-test.csv")
    
    df_hist = pd.read_csv(historical_csv) if os.path.exists(historical_csv) else pd.DataFrame()
    df_test = pd.read_csv(test_csv) if os.path.exists(test_csv) else pd.DataFrame()
    
    df = pd.concat([df_hist, df_test], ignore_index=True)
    if 'date' in df.columns:
        df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y', errors='coerce').fillna(
            pd.to_datetime(df['date'], errors='coerce')
        )
        df = df.sort_values('date').reset_index(drop=True)
        
    # Precompute seasonal averages from historical data for all atmospheric variables
    df['month'] = df['date'].dt.month
    df['day'] = df['date'].dt.day
    seasonal_avg = df.groupby(['month', 'day']).mean(numeric_only=True).reset_index()
    
    results = []
    
    # Initialize the starting date for the simulation
    current_sim_date = df.iloc[-1]['date']
    if start_date_str:
        current_sim_date = pd.to_datetime(start_date_str) - datetime.timedelta(days=1)
    
    # We will simulate `days` future days
    for i in range(days):
        last_row = df.iloc[-1].copy()
        next_date = current_sim_date + datetime.timedelta(days=1)
        current_sim_date = next_date
        
        # Create new dummy row copying atmospheric variables from yesterday
        new_row = last_row.copy()
        new_row['date'] = next_date
        new_row['rainfall_mm'] = 0.0 # Placeholder
        
        # Inject historical seasonal averages for this specific day of the year
        # This allows the AI to predict independently using purely 1950-2025 climatic trends!
        season_stats = seasonal_avg[(seasonal_avg['month'] == next_date.month) & (seasonal_avg['day'] == next_date.day)]
        if not season_stats.empty:
            season_stats = season_stats.iloc[0]
            if 'tmax_degC' in new_row:
                new_row['tmax_degC'] = season_stats['tmax_degC'] + np.random.normal(0, 0.5)
            if 'tmin_degC' in new_row:
                new_row['tmin_degC'] = season_stats['tmin_degC'] + np.random.normal(0, 0.5)
            if 'humidity_pct' in new_row:
                new_row['humidity_pct'] = season_stats['humidity_pct'] + np.random.normal(0, 1.0)
            if 'wind_speed_ms' in new_row:
                new_row['wind_speed_ms'] = season_stats['wind_speed_ms'] + np.random.normal(0, 0.2)
            if 'surface_pressure_hpa' in new_row and 'surface_pressure_hpa' in season_stats:
                new_row['surface_pressure_hpa'] = season_stats['surface_pressure_hpa']
            if 'radiation_wm2' in new_row and 'radiation_wm2' in season_stats:
                new_row['radiation_wm2'] = season_stats['radiation_wm2']
        
        
        # We append to df
        df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
        
        # Preprocess the tail to compute lags and rolling windows
        # We only need the last ~10 rows to compute 7-day rolling windows
        tail_df = df.tail(15).reset_index(drop=True)
        proc_tail = preprocess_dataset(tail_df)
        
        # Extract features for the very last row (the one we just added)
        feature_cols = [c for c in proc_tail.columns if c not in ['date', 'rainfall_mm', 'month', 'day']]
        X_pred = proc_tail.iloc[[-1]][feature_cols]
        
        predicted_rain = 0.0
        try:
            res = requests.post(
                f"{INFERENCE_URL}/predict/tabular",
                json={"model_name": model_name, "features": [X_pred.iloc[0].to_dict()]},
                timeout=5
            )
            if res.status_code == 200:
                predicted_rain = res.json().get("predictions", [0.0])[0]
            else:
                logging.error(f"Inference Service failed: {res.text}")
        except Exception as e:
            logging.warning(f"Future prediction failed on {next_date}: {e}")
            predicted_rain = 0.0
            
        # Update the dataframe with the actual predicted rainfall so the next loop uses it as lag_1
        df.at[df.index[-1], 'rainfall_mm'] = predicted_rain
        
        results.append({
            "date": next_date.strftime("%d-%b"),
            "our_prediction": round(predicted_rain, 1),
            "openmeteo": None
        })
        
    return results
