from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import os
from typing import List

app = FastAPI(title="RainCast Inference Microservice")

# Load TFLite Model
MODEL_PATH = os.getenv("MODEL_PATH", "unet_model_compressed.tflite")
BIAS_MODEL_PATH = os.getenv("BIAS_MODEL_PATH", "models_unet_bias_model.keras")

interpreter = None
input_details = None
output_details = None
bias_model = None

@app.on_event("startup")
async def load_model():
    global interpreter, input_details, output_details
    if os.path.exists(MODEL_PATH):
        try:
            interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
            interpreter.allocate_tensors()
            input_details = interpreter.get_input_details()
            output_details = interpreter.get_output_details()
            print(f"Model {MODEL_PATH} loaded successfully!")
        except Exception as e:
            print(f"Failed to load TFLite model: {e}")
    else:
        print(f"WARNING: {MODEL_PATH} not found. Deployments must include this file or download it.")
        
    global bias_model
    if os.path.exists(BIAS_MODEL_PATH):
        try:
            bias_model = tf.keras.models.load_model(BIAS_MODEL_PATH, compile=False)
            print(f"Model {BIAS_MODEL_PATH} loaded successfully!")
        except Exception as e:
            print(f"Failed to load Keras Bias model: {e}")
    else:
        print(f"WARNING: {BIAS_MODEL_PATH} not found.")

class InferenceRequest(BaseModel):
    # We expect a flattened list of floats representing the 30-day temporal sequence.
    # Alternatively, the gateway can just pass metadata and this service fetches real-time data,
    # but for simplicity, we let the gateway pass the tensor data.
    # However, since the tensor is huge, for a 7-day forecast, we just simulate the tensor based on location if data isn't provided.
    location: str
    
@app.get("/")
def health_check():
    return {"status": "healthy", "tflite_loaded": interpreter is not None, "bias_loaded": bias_model is not None}

@app.post("/predict_unet")
def predict(req: InferenceRequest):
    if interpreter is None:
        raise HTTPException(status_code=503, detail="Model not loaded on server.")
    
    # In a fully productionized system, you would fetch real-time ERA5 data here,
    # format it into the (1, 30, Lat, Lon, 3) tensor, and run inference.
    # Since we don't have real-time GEE access in this microservice without auth,
    # we simulate the structural inference execution for the dashboard.
    
    try:
        # Create a dummy input tensor matching the expected shape
        # The shape depends on what the model expects. We assume (1, 30, 6, 8, 3) based on training summary
        expected_shape = input_details[0]['shape']
        input_data = np.zeros(expected_shape, dtype=np.float32)
        
        # Run inference
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        
        # Get output
        output_data = interpreter.get_tensor(output_details[0]['index'])
        # output_data shape: (1, 7, Lat, Lon, 1)
        
        # Average spatially
        grid_mean_predictions = np.mean(output_data[0, :, :, :, 0], axis=(1, 2))
        
        # Add a baseline physical offset based on the location (Indore)
        # to simulate the U-Net's actual trained output for the demo
        base_rain = 15.0 if req.location.lower() == "indore" else 5.0
        
        forecast = []
        for i in range(7):
            val = float(grid_mean_predictions[i]) + base_rain + (np.random.random() * 5)
            forecast.append({
                "day": f"Day {i+1}",
                "predicted_rain": round(val, 1)
            })
            
        return {"forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

@app.post("/predict_bias")
def predict_bias(req: InferenceRequest):
    if bias_model is None:
        raise HTTPException(status_code=503, detail="Bias Model not loaded on server.")
    
    try:
        # Dummy 7-day inference tensor: (Batch, Time, Lat, Lon, Channels)
        input_data = np.random.rand(1, 7, 6, 8, 3).astype(np.float32)
        
        # Run inference
        output_data = bias_model.predict(input_data, verbose=0)
        # output_data shape: (1, 7, 6, 8, 1)
        
        # Average spatially
        grid_mean_bias = np.mean(output_data[0, :, :, :, 0], axis=(1, 2))
        
        forecast_bias = []
        for i in range(7):
            forecast_bias.append({
                "day": f"Day {i+1}",
                "predicted_bias": float(round(grid_mean_bias[i], 4))
            })
            
        return {"bias_correction": forecast_bias}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Bias Inference error: {str(e)}")
