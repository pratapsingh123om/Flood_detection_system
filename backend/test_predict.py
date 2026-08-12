import warnings
warnings.filterwarnings('ignore')

from ml.predict_7_days import predict_7_days

print("Testing xgboost...")
try:
    preds = predict_7_days("xgboost", "Indore", 60.0, 500.0, 80.0)
    for p in preds:
        print(f"Day: {p['day']}, Temp: {p['temp']}, Rain: {p['rain']}")
except Exception as e:
    print("XGBoost Failed:", e)

print("\nTesting hybrid...")
try:
    preds = predict_7_days("hybrid", "Indore", 60.0, 500.0, 80.0)
    for p in preds:
        print(f"Day: {p['day']}, Temp: {p['temp']}, Rain: {p['rain']}")
except Exception as e:
    print("Hybrid Failed:", e)
