import requests
import json

url = "https://raincast-backend-fqrk.onrender.com/api/predict"
payload = {
    "location": "Indore, Madhya Pradesh",
    "model": "convlstm_spatial_model",
    "timeframe": "test",
    "runoff": 62,
    "elevation": 531,
    "drainage": 78
}
try:
    res = requests.post(url, json=payload, timeout=200)
    print("Status:", res.status_code)
    try:
        data = res.json()
        print("Forecast:", json.dumps(data.get("weather_forecast", []), indent=2))
    except:
        print("Raw text:", res.text)
except Exception as e:
    print("Error:", e)
