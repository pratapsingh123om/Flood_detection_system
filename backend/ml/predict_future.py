import pandas as pd
import numpy as np
import os
import datetime
import logging
from ml.load_model import load_ml_model
from ml.preprocess import preprocess_dataset

def predict_next_30_days(model_name: str, location: str) -> list:
    """
    Autoregressively predicts rainfall for the next 30 days starting from the end of the test dataset.
    """
    model = load_ml_model(model_name)
    if not model:
        return []
        
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
        
    results = []
    
    # We will simulate 30 future days
    for i in range(30):
        last_row = df.iloc[-1].copy()
        next_date = last_row['date'] + datetime.timedelta(days=1)
        
        # Create new dummy row copying atmospheric variables from yesterday
        new_row = last_row.copy()
        new_row['date'] = next_date
        new_row['rainfall_mm'] = 0.0 # Placeholder
        
        # We append to df
        df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
        
        # Preprocess the tail to compute lags and rolling windows
        # We only need the last ~10 rows to compute 7-day rolling windows
        tail_df = df.tail(15).reset_index(drop=True)
        proc_tail = preprocess_dataset(tail_df)
        
        # Extract features for the very last row (the one we just added)
        feature_cols = [c for c in proc_tail.columns if c not in ['date', 'rainfall_mm']]
        X_pred = proc_tail.iloc[[-1]][feature_cols]
        
        predicted_rain = 0.0
        try:
            if isinstance(model, dict):
                clf = model.get("clf") or model.get("stage1_clf")
                
                if "stage3a_reg" in model and "stage2_extreme_clf" in model:
                    # 3-stage extreme pipeline
                    thresh = model.get("optimal_T_rain", 0.45)
                    prob = clf.predict_proba(X_pred)[0, 1]
                    if prob < thresh:
                        predicted_rain = 0.0
                    else:
                        ext_prob = model["stage2_extreme_clf"].predict_proba(X_pred)[0, 1]
                        # Lower threshold from default 0.5 to 0.35 to catch more extreme events 
                        if ext_prob > 0.35:
                            predicted_rain = model["stage3b_extreme_reg"].predict(X_pred)[0]
                            predicted_rain *= 1.10 # Add a 10% safety buffer for flood forecasting
                        else:
                            predicted_rain = model["stage3a_reg"].predict(X_pred)[0]
                else:
                    # 2-stage standard pipeline
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
