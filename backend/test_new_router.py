import os
import sys

base_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(base_dir)

from schemas.prediction_request import PredictionRequest
from api.router import get_prediction

print("="*80)
print("TESTING BACKEND ROUTER WITH WARD FLOOD RISKS & HYDROLOGICAL METRICS")
print("="*80)

req = PredictionRequest(
    location="Indore",
    ward_id=1,
    model="unet_lstm_bias",
    timeframe="7day",
    runoff=0.45,
    elevation=553.0,
    drainage=65.0,
    persona="planner"
)

resp = get_prediction(req)

print(f"SUCCESS: Weather Forecast Days: {len(resp.weather_forecast)}")
print(f"SUCCESS: Evaluated Test Points: {len(resp.test_data)}")
print(f"SUCCESS: Evaluated Metrics Count: {len(resp.metrics)}")
print(f"SUCCESS: Localized Ward Risks Count: {len(resp.ward_risks)}")

if resp.ward_risks:
    print("\nSAMPLE 85-WARD FLOOD RISKS:")
    for w in resp.ward_risks[:3]:
        print(f"   - Ward {w.ward_id} ({w.ward_name}): Rain = {w.predicted_rain_mm}mm, Runoff = {w.runoff_mm}mm, Depth = {w.water_depth_cm}cm, Level = {w.risk_level} ({w.color_hex})")

if resp.hydro_summary:
    print(f"\nHYDROLOGICAL SUMMARY: MAE = {resp.hydro_summary.mae}mm, RMSE = {resp.hydro_summary.rmse}mm, Match = {resp.hydro_summary.matching_pct}%")

print("="*80)
