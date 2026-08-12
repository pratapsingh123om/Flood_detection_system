import joblib
import os
import pandas as pd

model_path = r"c:\DEV\RainCast-ai\models\Models_new\xgboost_model.pkl"
rf_model_path = r"c:\DEV\RainCast-ai\models\Models_new\randomforest_model.pkl"

def inspect_model(path):
    try:
        print(f"\n--- Loading {path} ---")
        model = joblib.load(path)
        print("Model type:", type(model))
        
        if hasattr(model, "feature_names_in_"):
            print("Expected Features:", list(model.feature_names_in_))
        elif hasattr(model, "get_booster") and model.get_booster().feature_names:
            print("Expected Features:", model.get_booster().feature_names)
        elif hasattr(model, "steps"):
            print("Is a Pipeline. Steps:", [step[0] for step in model.steps])
            if hasattr(model.steps[-1][1], "feature_names_in_"):
                print("Pipeline last step expected features:", model.steps[-1][1].feature_names_in_)
        else:
            print("Could not easily determine feature names.")
    except Exception as e:
        print("Error:", e)

inspect_model(model_path)
inspect_model(rf_model_path)
