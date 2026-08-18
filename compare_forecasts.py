import requests
import json
from datetime import datetime, timedelta

def compare_forecasts():
    unet_forecast = []
    try:
        res = requests.post(
            "https://raincast-backend-ml-model-775429752478.asia-southeast1.run.app/predict_unet",
            json={"location": "Indore, Madhya Pradesh"},
            timeout=120
        )
        if res.status_code == 200:
            unet_data = res.json().get("forecast", [])
            unet_forecast = [float(d["predicted_rain"]) for d in unet_data]
    except Exception as e:
        pass

    om_forecast = []
    om_dates = []
    try:
        url = "https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&daily=precipitation_sum&timezone=auto&forecast_days=7"
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            data = res.json()
            om_forecast = data['daily']['precipitation_sum']
            om_dates = data['daily']['time']
    except Exception as e:
        pass

    if unet_forecast and om_forecast:
        with open("C:/Users/gsr33/.gemini/antigravity/brain/4593678c-c58d-441e-9a14-5c886ad23169/forecast_comparison.md", "w") as f:
            f.write("# 7-Day Rainfall Forecast Comparison (Indore)\n\n")
            f.write("Comparing the U-Net spatial model against OpenMeteo's deterministic forecast.\n\n")
            f.write("| Date | OpenMeteo (mm) | U-Net (mm) | Difference (mm) |\n")
            f.write("|------|----------------|------------|-----------------|\n")
            
            total_diff = 0
            for i in range(7):
                date = om_dates[i]
                om_val = om_forecast[i] if om_forecast[i] is not None else 0.0
                unet_val = unet_forecast[i] if i < len(unet_forecast) else 0.0
                diff = abs(om_val - unet_val)
                total_diff += diff
                
                f.write(f"| {date} | {om_val:.1f} | {unet_val:.1f} | {diff:.1f} |\n")
                
            f.write(f"\n**Average Mean Absolute Error (MAE) against OpenMeteo**: {total_diff/7:.2f} mm\n")

if __name__ == "__main__":
    compare_forecasts()
