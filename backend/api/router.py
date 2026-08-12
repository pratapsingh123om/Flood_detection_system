from fastapi import APIRouter, HTTPException
import os

from schemas.prediction_request import PredictionRequest
from schemas.prediction_response import PredictionResponse, ForecastDay, TestDataPoint
from ml.predict_7_days import predict_7_days
from ml.evaluate_test_data import evaluate_test_data
from ml.predict_future import predict_next_30_days
import requests
import datetime

api_router = APIRouter()

@api_router.get("/models")
def get_available_models():
    """
    Scans the Models_new directory and returns a list of available models.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    models_dir = os.path.join(base_dir, "models", "Models_new")
    
    if not os.path.exists(models_dir):
        return {"models": []}
        
    model_files = [f for f in os.listdir(models_dir) if f.endswith(('.pkl', '.joblib'))]
    
    models = []
    for f in model_files:
        # e.g., "xgboost_model.pkl" -> "xgboost_model"
        model_id = f.replace('.pkl', '').replace('.joblib', '')
        
        # Make a pretty display name: "xgboost_model" -> "Xgboost Model"
        display_name = model_id.replace('_', ' ').title()
        
        models.append({
            "id": model_id,
            "name": display_name
        })
        
    # Sort upgraded_extreme_hybrid_pipeline to the top as the 'best' model
    models.sort(key=lambda x: 0 if x["id"] == "upgraded_extreme_hybrid_pipeline" else 1)
        
    return {"models": models}

@api_router.post("/predict", response_model=PredictionResponse)
def get_prediction(request: PredictionRequest):
    """
    Takes in hydrological parameters and returns the dashboard data
    including 7-day predicted weather forecast and the evaluated test data.
    """
    try:
        forecast_7_days = predict_7_days(
            model_name=request.model,
            location=request.location,
            runoff=request.runoff,
            elevation=request.elevation,
            drainage=request.drainage
        )
        if request.timeframe == "month":
            # Future prediction mode
            test_evaluation = predict_next_30_days(model_name=request.model, location=request.location)
            # Map 'our_prediction' to 'predicted' and set actual to 0 for chart compatibility
            for d in test_evaluation:
                d['predicted'] = d.pop('our_prediction', 0)
                d['actual'] = 0.0
                d['threshold'] = 30.0
            
            # Fetch OpenMeteo forecast (up to 16 days)
            try:
                # We hardcode coordinates for Indore as default for this example, but real geocoding could be used
                om_res = requests.get("https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&daily=precipitation_sum&timezone=auto&forecast_days=16", timeout=5)
                if om_res.status_code == 200:
                    om_data = om_res.json()
                    om_dates = om_data.get('daily', {}).get('time', [])
                    om_precip = om_data.get('daily', {}).get('precipitation_sum', [])
                    
                    # Create a dict mapping date string like "12-Aug" to precipitation
                    om_map = {}
                    for dt, precip in zip(om_dates, om_precip):
                        d_obj = datetime.datetime.strptime(dt, "%Y-%m-%d")
                        d_str = d_obj.strftime("%d-%b")
                        om_map[d_str] = precip
                        
                    for d in test_evaluation:
                        if d['date'] in om_map:
                            d['openmeteo'] = om_map[d['date']]
                        else:
                            d['openmeteo'] = None
            except Exception as e:
                print(f"OpenMeteo fetch failed: {e}")
        else:
            # Test evaluation mode (past 42 days)
            test_evaluation = evaluate_test_data(model_name=request.model)
        
        # Calculate dynamic metrics
        import math
        tp = tn = fp = fn = 0
        se = sae = 0
        threshold = 10.0 # Heavy rain threshold for classification metrics
        
        for d in test_evaluation:
            act = d['actual']
            pred = d['predicted']
            se += (act - pred) ** 2
            sae += abs(act - pred)
            
            if act > threshold and pred > threshold: tp += 1
            elif act <= threshold and pred <= threshold: tn += 1
            elif act <= threshold and pred > threshold: fp += 1
            elif act > threshold and pred <= threshold: fn += 1
            
        total = len(test_evaluation) or 1
        rmse = math.sqrt(se / total)
        mae = sae / total
        
        pod = tp / (tp + fn) if (tp + fn) > 0 else 0
        far = fp / (fp + tp) if (fp + tp) > 0 else 0
        acc = (tp + tn) / total
        csi = tp / (tp + fp + fn) if (tp + fp + fn) > 0 else 0
        
        metrics = [
            {"label": "Accuracy", "val": f"{acc*100:.1f}%", "sub": "Overall", "color": "#00d4ff"},
            {"label": "CSI", "val": f"{csi:.3f}", "sub": "Critical Success", "color": "#06ffa5"},
            {"label": "POD", "val": f"{pod:.3f}", "sub": "Prob. of Detection", "color": "#06ffa5"},
            {"label": "FAR", "val": f"{far:.3f}", "sub": "False Alarm Rate", "color": "#f59e0b"},
            {"label": "RMSE", "val": f"{rmse:.1f}mm", "sub": "Error", "color": "#7c5af5"},
            {"label": "MAE", "val": f"{mae:.1f}mm", "sub": "Abs Error", "color": "#00d4ff"},
        ]
        
        risk_areas = [
            {"name": "Narmada Basin", "district": "Hoshangabad", "score": 94, "pop": "2.4M"},
            {"name": "Shipra River Zone", "district": "Ujjain", "score": 87, "pop": "892K"},
            {"name": "Khan River Corridor", "district": "Indore", "score": 81, "pop": "3.1M"},
            {"name": "Betwa Catchment", "district": "Vidisha", "score": 76, "pop": "1.2M"},
            {"name": "Chambal Valley", "district": "Morena", "score": 71, "pop": "654K"},
        ]
        
        for area in risk_areas:
            if request.elevation < 500:
                area["score"] = min(100, area["score"] + 5)
        
        return PredictionResponse(
            test_data=[TestDataPoint(**d) for d in test_evaluation],
            weather_forecast=[ForecastDay(**d) for d in forecast_7_days],
            metrics=metrics,
            risk_areas=risk_areas
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
