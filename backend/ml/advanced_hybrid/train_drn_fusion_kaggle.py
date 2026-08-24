"""
FINAL SCRIPT: Deep Residual Network (DRN) with Covariate Fusion (KAGGLE VERSION)
--------------------------------------------------------------------------------
This script trains the DRN using both the 75-year ERA5 meteorological data 
AND the high-resolution environmental covariates (DEM and NDVI).

Instructions for Kaggle:
1. Ensure your dataset is attached to the notebook.
2. In the right panel, under "Settings", turn on "GPU T4 x2" or "GPU P100".
3. Add a cell at the top and run: `!pip install rasterio`
4. Copy this entire script into the next cell and run it!
"""

import os
import glob
import numpy as np
import xarray as xr
import rasterio
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import torch.nn.functional as F

# ==========================================
# CONFIGURATION FOR KAGGLE
# ==========================================
# Kaggle mounts datasets in the /kaggle/input/ directory.
# Looking at your screenshot, Kaggle named the folder with UNDERSCORES: 'btp_collab_model'
# Kaggle sometimes nests uploaded zip folders inside an extra subdirectory.
# We use recursive globbing (**) to guarantee we find the files anywhere inside /kaggle/input/
try:
    ERA5_FOLDER = os.path.dirname(glob.glob('/kaggle/input/**/*.nc', recursive=True)[0]) + '/*.nc'
    DEM_PATH = glob.glob('/kaggle/input/**/indore_dem_30m.tif', recursive=True)[0]
except IndexError:
    print("CRITICAL ERROR: Could not find the ERA5 .nc files or DEM .tif file in /kaggle/input/")
    print("Please check that the dataset is attached and contains these files.")
    raise

# Check if NDVI exists dynamically or fallback gracefully
try:
    NDVI_PATH = glob.glob('/kaggle/input/**/indore_ndvi_30m.tif', recursive=True)[0]
except IndexError:
    print("WARNING: NDVI file not found in the dataset. Downgrading to 2-channel input (Rainfall + DEM).")
    NDVI_PATH = None

# Kaggle allows writing output files ONLY to the /kaggle/working/ directory
CHECKPOINT_PATH = '/kaggle/working/drn_fused_checkpoint.pth'
FINAL_MODEL_PATH = '/kaggle/working/drn_fused_model_final.pth'

BATCH_SIZE = 2
EPOCHS = 50
LEARNING_RATE = 1e-4
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Using device: {DEVICE}")

# ==========================================
# 1. ASYMMETRIC LOSS FUNCTION
# ==========================================
class AsymmetricLoss(nn.Module):
    def __init__(self, extreme_threshold=50.0, underestimation_penalty=10.0):
        super(AsymmetricLoss, self).__init__()
        self.threshold = extreme_threshold
        self.penalty = underestimation_penalty

    def forward(self, pred, target):
        error = target - pred
        is_extreme_underestimation = (error > 0) & (target > self.threshold)
        weights = torch.where(is_extreme_underestimation, self.penalty, 1.0)
        loss = weights * (error ** 2)
        return loss.mean()

# ==========================================
# 2. DEEP RESIDUAL NETWORK (DRN) WITH FUSION
# ==========================================
class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super(ResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(channels, channels, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(channels)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(channels, channels, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(channels)

    def forward(self, x):
        residual = x
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += residual
        return self.relu(out)

class DRNDownscaler(nn.Module):
    # in_channels = 3 (ERA5 Rainfall + DEM + NDVI) or 2 if NDVI is missing
    def __init__(self, in_channels=3, out_channels=1, num_res_blocks=8):
        super(DRNDownscaler, self).__init__()
        self.conv_in = nn.Conv2d(in_channels, 64, kernel_size=3, padding=1)
        self.relu = nn.ReLU(inplace=True)
        self.res_blocks = nn.Sequential(
            *[ResidualBlock(64) for _ in range(num_res_blocks)]
        )
        self.conv_out = nn.Conv2d(64, out_channels, kernel_size=3, padding=1)

    def forward(self, x):
        x = self.relu(self.conv_in(x))
        x = self.res_blocks(x)
        x = self.conv_out(x)
        return torch.relu(x)

# ==========================================
# 3. FUSED DATASET LOADER
# ==========================================
class FusedFloodDataset(Dataset):
    def __init__(self, era5_path, dem_path, ndvi_path):
        print("Loading 75-year ERA5 dataset...")
        files = glob.glob(era5_path)
        if not files:
            raise ValueError(f"No files found at {era5_path}")
            
        ds = xr.open_mfdataset(files, combine='by_coords')
        precip_var = 'total_precipitation' if 'total_precipitation' in ds.data_vars else 'tp'
        
        precip_data = ds[precip_var].values
        if np.max(precip_data) < 5.0:
            precip_data = precip_data * 1000.0
        precip_data = np.nan_to_num(precip_data, nan=0.0)
        
        print("Loading Static Covariates (DEM & NDVI)...")
        with rasterio.open(dem_path) as src:
            dem_data = src.read(1)
        
        # Normalize DEM
        dem_data = (dem_data - np.min(dem_data)) / (np.max(dem_data) - np.min(dem_data) + 1e-8)
        self.target_shape = dem_data.shape
        self.dem_tensor = torch.tensor(dem_data, dtype=torch.float32).unsqueeze(0)
        
        # Handle NDVI if present
        self.has_ndvi = ndvi_path is not None
        if self.has_ndvi:
            with rasterio.open(ndvi_path) as src:
                ndvi_data = src.read(1)
            ndvi_data = (ndvi_data - np.min(ndvi_data)) / (np.max(ndvi_data) - np.min(ndvi_data) + 1e-8)
            self.ndvi_tensor = torch.tensor(ndvi_data, dtype=torch.float32).unsqueeze(0)
            
        self.era5_data = precip_data

    def __len__(self):
        return len(self.era5_data) - 1

    def __getitem__(self, idx):
        era5_input = self.era5_data[idx]
        era5_target = self.era5_data[idx + 1]
        
        era5_in_t = torch.tensor(era5_input, dtype=torch.float32).unsqueeze(0).unsqueeze(0)
        era5_out_t = torch.tensor(era5_target, dtype=torch.float32).unsqueeze(0).unsqueeze(0)
        
        era5_in_highres = F.interpolate(era5_in_t, size=self.target_shape, mode='bilinear', align_corners=False).squeeze(0)
        era5_out_highres = F.interpolate(era5_out_t, size=self.target_shape, mode='bilinear', align_corners=False).squeeze(0)
        
        if self.has_ndvi:
            fused_input = torch.cat([era5_in_highres, self.dem_tensor, self.ndvi_tensor], dim=0)
        else:
            fused_input = torch.cat([era5_in_highres, self.dem_tensor], dim=0)
        
        # Extract a Random Spatial Patch to prevent GPU OOM
        PATCH_SIZE = 128
        h_max = self.target_shape[0] - PATCH_SIZE
        w_max = self.target_shape[1] - PATCH_SIZE
        
        y_start = torch.randint(0, max(1, h_max), (1,)).item()
        x_start = torch.randint(0, max(1, w_max), (1,)).item()
        
        fused_patch = fused_input[:, y_start:y_start+PATCH_SIZE, x_start:x_start+PATCH_SIZE]
        target_patch = era5_out_highres[:, y_start:y_start+PATCH_SIZE, x_start:x_start+PATCH_SIZE]
        
        return fused_patch, target_patch

# ==========================================
# 4. TRAINING LOOP
# ==========================================
def train_fused_model():
    print("Initializing Fused Dataset...")
    try:
        dataset = FusedFloodDataset(ERA5_FOLDER, DEM_PATH, NDVI_PATH)
    except Exception as e:
        print(f"Error loading datasets: {e}")
        return
        
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)
    
    print(f"Training Samples: {train_size:,} | Validation Samples: {val_size:,}")
    
    in_channels = 3 if NDVI_PATH else 2
    model = DRNDownscaler(in_channels=in_channels, out_channels=1).to(DEVICE)
    criterion = AsymmetricLoss(extreme_threshold=50.0, underestimation_penalty=10.0)
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    
    print("\nStarting Training on", DEVICE, "...")
    
    # --- CHECKPOINT LOADING ---
    start_epoch = 0
    if os.path.exists(CHECKPOINT_PATH):
        print(f"Found existing checkpoint at {CHECKPOINT_PATH}. Resuming training...")
        checkpoint = torch.load(CHECKPOINT_PATH, map_location=DEVICE)
        model.load_state_dict(checkpoint['model_state_dict'])
        optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        start_epoch = checkpoint['epoch'] + 1
        print(f"Resuming from Epoch {start_epoch+1}")
    
    for epoch in range(start_epoch, EPOCHS):
        model.train()
        train_loss = 0.0
        
        for batch_idx, (inputs, targets) in enumerate(train_loader):
            inputs, targets = inputs.to(DEVICE), targets.to(DEVICE)
            
            optimizer.zero_grad()
            outputs = model(inputs)
            
            loss = criterion(outputs, targets)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            
            if batch_idx % 100 == 0 and batch_idx > 0:
                print(f"Epoch [{epoch+1}/{EPOCHS}] Batch [{batch_idx}/{len(train_loader)}] Loss: {loss.item():.4f}")
        
        # Validation Phase
        model.eval()
        val_loss = 0.0
        with torch.no_grad():
            for inputs, targets in val_loader:
                inputs, targets = inputs.to(DEVICE), targets.to(DEVICE)
                outputs = model(inputs)
                loss = criterion(outputs, targets)
                val_loss += loss.item()
                
        avg_train_loss = train_loss / len(train_loader)
        avg_val_loss = val_loss / len(val_loader)
        print(f"==> End of Epoch {epoch+1} | Train Loss: {avg_train_loss:.4f} | Val Loss: {avg_val_loss:.4f}\n")

        # --- CHECKPOINT SAVING ---
        torch.save({
            'epoch': epoch,
            'model_state_dict': model.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'train_loss': avg_train_loss,
            'val_loss': avg_val_loss,
        }, CHECKPOINT_PATH)
        print(f"Checkpoint saved for Epoch {epoch+1} to {CHECKPOINT_PATH}")

    torch.save(model.state_dict(), FINAL_MODEL_PATH)
    print(f"Training Complete! Final model saved to {FINAL_MODEL_PATH}. You can download it from the right panel under 'Output'.")

if __name__ == "__main__":
    train_fused_model()
