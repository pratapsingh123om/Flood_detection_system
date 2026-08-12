import pandas as pd
import numpy as np
import os

def preprocess_dataset(df):
    """
    Applies temporal encodings, atmospheric physics features, lags, and rolling windows.
    Returns a dataframe with 71 features.
    """
    df_proc = df.copy()

    if 'date' in df_proc.columns:
        df_proc['date'] = pd.to_datetime(df_proc['date'], format='%d-%m-%Y', errors='coerce').fillna(
            pd.to_datetime(df_proc['date'], errors='coerce')
        )
        df_proc = df_proc.sort_values('date').reset_index(drop=True)

    df_proc['day_of_year'] = df_proc['date'].dt.dayofyear
    df_proc['sin_day'] = np.sin(2 * np.pi * df_proc['day_of_year'] / 365.25)
    df_proc['cos_day'] = np.cos(2 * np.pi * df_proc['day_of_year'] / 365.25)

    df_proc['dtr'] = df_proc['tmax_degC'] - df_proc['tmin_degC']
    df_proc['temp_humidity_idx'] = df_proc['tmax_degC'] * df_proc['humidity_pct']
    df_proc['dewpoint_spread'] = df_proc['tmax_degC'] - df_proc['dewpoint_degC']
    df_proc['pressure_drop_1d'] = df_proc['surface_pressure_hpa'].shift(1) - df_proc['surface_pressure_hpa']

    base_cols = [
        'tmax_degC', 'tmin_degC', 'humidity_pct', 'radiation_wm2', 'wind_speed_ms',
        'dewpoint_degC', 'surface_pressure_hpa', 'soil_moisture', 'evapotranspiration_mm',
        'dtr', 'dewpoint_spread'
    ]

    for col in base_cols:
        for lag in [1, 2, 3]:
            df_proc[f'{col}_lag_{lag}'] = df_proc[col].shift(lag)
        df_proc[f'{col}_roll3_mean'] = df_proc[col].shift(1).rolling(3).mean()
        df_proc[f'{col}_roll7_std'] = df_proc[col].shift(1).rolling(7).std()

    return df_proc.dropna().reset_index(drop=True)

def get_latest_features(csv_path: str, num_days: int = 7):
    if not os.path.exists(csv_path):
        return None, None
    df = pd.read_csv(csv_path)
    df_proc = preprocess_dataset(df)
    if len(df_proc) < num_days:
        num_days = len(df_proc)
    latest_df = df_proc.tail(num_days).reset_index(drop=True)
    feature_cols = [c for c in df_proc.columns if c not in ['date', 'rainfall_mm']]
    return latest_df[feature_cols], latest_df['date']

def get_test_features(historical_csv: str, test_csv: str):
    """
    Concatenates historical and test data to compute accurate lags,
    then returns only the test portion.
    """
    if not os.path.exists(test_csv):
        raise FileNotFoundError(f"Test CSV not found: {test_csv}")
        
    df_hist = pd.DataFrame()
    if os.path.exists(historical_csv):
        df_hist = pd.read_csv(historical_csv)
        
    df_test = pd.read_csv(test_csv)
    
    # Concatenate to compute rolling means properly
    df_combined = pd.concat([df_hist, df_test], ignore_index=True)
    df_proc = preprocess_dataset(df_combined)
    
    # Filter for July 1, 2026 onwards
    test_mask = df_proc['date'] >= pd.to_datetime('2026-07-01')
    df_test_proc = df_proc[test_mask].reset_index(drop=True)
    
    feature_cols = [c for c in df_proc.columns if c not in ['date', 'rainfall_mm']]
    
    return df_test_proc[feature_cols], df_test_proc['rainfall_mm'], df_test_proc['date']
