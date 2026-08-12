import joblib
import os
import logging
import sys

# Import custom loss functions
from ml.custom_objects import moderated_asymmetric_loss, asymmetric_heavy_rain_loss

# Inject into __main__ so joblib can find them during unpickling
import __main__
setattr(__main__, "moderated_asymmetric_loss", moderated_asymmetric_loss)
setattr(__main__, "asymmetric_heavy_rain_loss", asymmetric_heavy_rain_loss)

def load_ml_model(model_name: str):
    """
    Loads a machine learning model from the models/Models_new directory based on the filename (without extension).
    Handles standard sklearn models as well as dictionaries for 2-stage models.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    models_dir = os.path.join(base_dir, "models", "Models_new")
    
    # Check if the requested model exists as a .pkl or .joblib
    model_path = os.path.join(models_dir, f"{model_name}.pkl")
    if not os.path.exists(model_path):
        model_path = os.path.join(models_dir, f"{model_name}.joblib")
        if not os.path.exists(model_path):
            logging.warning(f"Model file for {model_name} not found. Returning None.")
            return None
        
    try:
        logging.info(f"Loading model from {model_path}")
        model = joblib.load(model_path)
        return model
    except Exception as e:
        logging.error(f"Error loading model {model_name}: {str(e)}")
        return None
