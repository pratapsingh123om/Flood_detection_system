"""
Standalone Deep Residual Network (DRN) Training Script for Google Colab
-----------------------------------------------------------------------
This script is designed to run directly in Google Colab with GPU acceleration.
It includes:
1. The xarray/NetCDF dataloader for the 75-year ERA5 data.
2. The Asymmetric Loss Function (penalizing severe event underestimation).
3. The Deep Residual Network (DRN) architecture.
4. The PyTorch training loop.

Instructions for Colab:
1. Mount your Google Drive.
2. Ensure you have `xarray`, `netCDF4`, and `torch` installed.
3. Update the FOLDER_PATH to point to your .nc files.
4. Run the script.
"""

import os
import glob
import numpy as np
import xarray as xr
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader

# ==========================================
# CONFIGURATION
# ==========================================
FOLDER_PATH = '/content/drive/MyDrive/BTP-COLAB/*.nc'
BATCH_SIZE = 32
EPOCHS = 50
LEARNING_RATE = 1e-4
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Using device: {DEVICE}")

# ==========================================
# 1. ASYMMETRIC LOSS FUNCTION
# ==========================================
class AsymmetricLoss(nn.Module):
    """
    Standard MSE forces the model to predict the "average" weather. 
    This Asymmetric loss heavily penalizes the model if it underestimates 
    an extreme rainfall event, forcing it to learn the flood peaks.
    """
    def __init__(self, extreme_threshold=50.0, underestimation_penalty=10.0):
        super(AsymmetricLoss, self).__init__()
        self.threshold = extreme_threshold
        self.penalty = underestimation_penalty

    def forward(self, pred, target):
        error = target - pred
        
        # If target > pred (Underestimation) AND target is an extreme event
        # we multiply the squared error by the heavy penalty.
        is_extreme_underestimation = (error > 0) & (target > self.threshold)
        
        weights = torch.where(is_extreme_underestimation, self.penalty, 1.0)
        loss = weights * (error ** 2)
        
        return loss.mean()

# ==========================================
# 2. DEEP RESIDUAL NETWORK (DRN)
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
    def __init__(self, in_channels=1, out_channels=1, num_res_blocks=8):
        super(DRNDownscaler, self).__init__()
        
        # Input feature extraction
        self.conv_in = nn.Conv2d(in_channels, 64, kernel_size=3, padding=1)
        self.relu = nn.ReLU(inplace=True)
        
        # Deep Residual Core (Prevents vanishing gradients on extreme mapping)
        self.res_blocks = nn.Sequential(
            *[ResidualBlock(64) for _ in range(num_res_blocks)]
        )
        
        # Output mapping (ReLU ensures no negative rainfall predictions)
        self.conv_out = nn.Conv2d(64, out_channels, kernel_size=3, padding=1)

    def forward(self, x):
        x = self.relu(self.conv_in(x))
        x = self.res_blocks(x)
        x = self.conv_out(x)
        return torch.relu(x)

# ==========================================
# 3. DATASET LOADER (ERA5)
# ==========================================
class ERA5Dataset(Dataset):
    def __init__(self, folder_path, seq_length=1):
        """
        Loads the concatenated ERA5 NetCDF files.
        For now, this assumes predicting precipitation from past precipitation/variables.
        """
        files = glob.glob(folder_path)
        if not files:
            raise ValueError(f"No files found at {folder_path}")
            
        print("Loading 75-year dataset into memory... (This may take a minute)")
        self.ds = xr.open_mfdataset(files, combine='by_coords')
        
        # Identify precipitation variable
        self.precip_var = 'total_precipitation' if 'total_precipitation' in self.ds.data_vars else 'tp'
        
        # Load values and convert to mm if they are in meters
        precip_data = self.ds[self.precip_var].values
        if np.max(precip_data) < 5.0:
            precip_data = precip_data * 1000.0
            
        # Replace NaNs with 0
        precip_data = np.nan_to_num(precip_data, nan=0.0)
        
        # Expand dims for PyTorch (Channels, Height, Width)
        self.data = np.expand_dims(precip_data, axis=1).astype(np.float32)
        self.seq_length = seq_length

    def __len__(self):
        return len(self.data) - self.seq_length

    def __getitem__(self, idx):
        # Input: Past time step
        x = self.data[idx : idx + self.seq_length]
        # Target: Next time step
        y = self.data[idx + self.seq_length]
        
        # Reshape to (C, H, W)
        x = torch.tensor(x).squeeze(0)
        y = torch.tensor(y)
        return x, y

# ==========================================
# 4. TRAINING LOOP
# ==========================================
def train_model():
    print("Initializing Dataset...")
    dataset = ERA5Dataset(FOLDER_PATH)
    
    # Split 80% train, 20% validation
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=2)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=2)
    
    print(f"Training Samples: {train_size:,} | Validation Samples: {val_size:,}")
    
    # Initialize Model, Loss, and Optimizer
    model = DRNDownscaler(in_channels=1, out_channels=1).to(DEVICE)
    criterion = AsymmetricLoss(extreme_threshold=50.0, underestimation_penalty=10.0)
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    
    print("\nStarting Training on", DEVICE, "...")
    
    for epoch in range(EPOCHS):
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

    # Save the trained model weights
    torch.save(model.state_dict(), '/content/drive/MyDrive/BTP-COLAB/drn_era5_model.pth')
    print("Training Complete! Model saved to Google Drive.")

if __name__ == "__main__":
    train_model()
