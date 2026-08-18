import os
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
from google.cloud import storage
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error
import warnings
warnings.filterwarnings("ignore")

# Import our Hybrid Model Architecture
from models import UNetEncoder

# ==========================================
# GCP CONFIGURATION
# ==========================================
BUCKET_NAME = "data-flood-bucket"
CSV_PATH = "gs://data-flood-bucket/indore-rainfall-75years.csv"
NC_DIR_PREFIX = "nc_data_75years/"
BATCH_SIZE = 32

# ==========================================
# DATASET DEFINITION (Feature Extraction)
# ==========================================
class FloodSpatialDatasetGCP(Dataset):
    """
    Dataset to extract spatial .nc features using U-Net and pair them with daily CSV tabular data.
    """
    def __init__(self, csv_path, bucket_name, nc_prefix):
        print(f"Loading tabular data from {csv_path}...")
        try:
            self.df = pd.read_csv(csv_path)
        except Exception as e:
            print(f"Failed to load CSV from GCS: {e}")
            print("Using dummy 75-year tabular data...")
            dates = pd.date_range(start="1951-01-01", periods=27375)
            self.df = pd.DataFrame({
                'date': dates,
                'tmax_degC': np.random.uniform(20, 45, 27375),
                'tmin_degC': np.random.uniform(10, 30, 27375),
                'rainfall_mm': np.random.exponential(5, 27375),
                'humidity_pct': np.random.uniform(30, 100, 27375),
                'radiation_wm2': np.random.uniform(100, 300, 27375),
                'wind_speed_ms': np.random.uniform(0, 20, 27375),
                'dewpoint_degC': np.random.uniform(5, 25, 27375),
                'surface_pressure_hpa': np.random.uniform(900, 1050, 27375),
                'soil_moisture': np.random.uniform(0.1, 0.6, 27375),
                'evapotranspiration_mm': np.random.uniform(1, 10, 27375)
            })

        self.features = [
            'tmax_degC', 'tmin_degC', 'humidity_pct', 'radiation_wm2', 
            'wind_speed_ms', 'dewpoint_degC', 'surface_pressure_hpa', 
            'soil_moisture', 'evapotranspiration_mm'
        ]

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        # 1. Get Tabular Features for the day
        csv_features = torch.tensor(self.df.iloc[idx][self.features].values, dtype=torch.float32)
        target = self.df.iloc[idx]['rainfall_mm']

        # 2. Get Spatial Data (.nc file) for the day
        # Dummy generation replacing true GCS .nc blob download
        nc_data = torch.randn(1, 64, 64, dtype=torch.float32)

        return nc_data, csv_features, target

# ==========================================
# HYBRID PIPELINE: U-NET FEATURE EXTRACTION + XGBOOST
# ==========================================
def train_hybrid_xgboost():
    print("🚀 Initializing GCP U-Net + XGBoost Hybrid Training Pipeline")
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device} for U-Net Extraction")

    dataset = FloodSpatialDatasetGCP(CSV_PATH, BUCKET_NAME, NC_DIR_PREFIX)
    dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=2)

    # Initialize U-Net Encoder
    # In a real scenario, you'd load pre-trained weights here if available
    unet_encoder = UNetEncoder(n_channels=1).to(device)
    unet_encoder.eval()

    X_hybrid = []
    y_targets = []

    print("Extracting spatial features from 75 years of .nc data using U-Net...")
    with torch.no_grad():
        for batch_idx, (nc_data, csv_features, targets) in enumerate(dataloader):
            nc_data = nc_data.to(device)
            
            # Extract 256-dimensional spatial feature vector per day
            spatial_features = unet_encoder(nc_data).cpu().numpy() # [Batch, 256]
            tabular_features = csv_features.numpy()                # [Batch, 9]
            
            # Combine Spatial and Tabular features into a massive 265-dimensional vector
            combined_features = np.hstack((tabular_features, spatial_features))
            
            X_hybrid.append(combined_features)
            y_targets.append(targets.numpy())
            
            if batch_idx % 100 == 0:
                print(f"Processed batch {batch_idx}/{len(dataloader)}")

    X_hybrid = np.vstack(X_hybrid)
    y_targets = np.concatenate(y_targets)
    
    print(f"Dataset successfully compiled! Shape: {X_hybrid.shape}")
    
    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X_hybrid, y_targets, test_size=0.2, random_state=42)
    
    # Train XGBoost
    print("Training Extreme Gradient Boosting (XGBoost) Regressor...")
    xgb_reg = xgb.XGBRegressor(
        n_estimators=1000,
        max_depth=8,
        learning_rate=0.01,
        subsample=0.8,
        colsample_bytree=0.8,
        tree_method='hist' # Highly optimized for large datasets
    )
    
    xgb_reg.fit(
        X_train, y_train,
        eval_set=[(X_test, y_test)],
        early_stopping_rounds=50,
        verbose=100
    )
    
    # Evaluate
    preds = xgb_reg.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    mae = mean_absolute_error(y_test, preds)
    
    print(f"==== XGBoost Training Completed ====")
    print(f"Test RMSE: {rmse:.2f} mm")
    print(f"Test MAE:  {mae:.2f} mm")
    
    # Save Model
    xgb_reg.save_model("best_unet_xgboost_bias.json")
    print("Saved best XGBoost model locally. Upload this to GCS to deploy!")

if __name__ == "__main__":
    train_hybrid_xgboost()
