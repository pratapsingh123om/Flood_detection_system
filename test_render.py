import sys
import requests
import json

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "https://raincast-backend-fqrk.onrender.com"
print(f"Testing RainCast API at: {BASE_URL}\n")

# 1. Health check
try:
    r = requests.get(f"{BASE_URL}/", timeout=15)
    print(f"[/] Health check: {r.status_code} -> {r.json()}")
except Exception as e:
    print(f"[/] Health check failed: {e}")

# 2. Available models
try:
    r = requests.get(f"{BASE_URL}/api/models", timeout=15)
    print(f"[/api/models] Status: {r.status_code}")
    if r.status_code == 200:
        models = r.json().get("models", [])
        print(f"Available models count: {len(models)}")
        for m in models[:4]:
            name = m.get('name', '').encode('ascii', 'replace').decode('ascii')
            print(f" - {m.get('id')}: {name}")
except Exception as e:
    print(f"[/api/models] Failed: {e}")

# 3. Prediction request
payload = {
    "location": "Indore, Madhya Pradesh",
    "model": "rainfall_only_spatial",
    "timeframe": "7day",
    "runoff": 62,
    "elevation": 531,
    "drainage": 78
}

print(f"\n[/api/predict] Sending payload with runoff=62, model='rainfall_only_spatial'...")
try:
    res = requests.post(f"{BASE_URL}/api/predict", json=payload, timeout=60)
    print("Status:", res.status_code)
    if res.status_code == 200:
        data = res.json()
        forecast = data.get("weather_forecast", [])
        print(f"Forecast days returned: {len(forecast)}")
        for day in forecast:
            print(f"  {day.get('day')} ({day.get('date')}): {day.get('rain')} mm, {day.get('temp')} C {day.get('icon')}")
        wards = data.get("ward_risks", [])
        print(f"Ward risk profiles computed: {len(wards)}")
    else:
        print("Response text:", res.text[:300])
except Exception as e:
    print("Prediction request failed:", e)
