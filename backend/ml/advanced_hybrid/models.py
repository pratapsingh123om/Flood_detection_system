import torch
import torch.nn as nn
import torch.nn.functional as F

class DoubleConv(nn.Module):
    """(convolution => [BN] => ReLU) * 2"""
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.double_conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        return self.double_conv(x)

class UNetEncoder(nn.Module):
    """
    Standard U-Net Encoder to extract spatial features from 64x64 .nc data.
    Input: [Batch, Channels, 64, 64]
    Output: Flattened feature vector
    """
    def __init__(self, n_channels):
        super(UNetEncoder, self).__init__()
        self.inc = DoubleConv(n_channels, 32)
        self.down1 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(32, 64))
        self.down2 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(64, 128))
        self.down3 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(128, 256))
        
        # We output a 1D vector representing the spatial context
        self.flatten = nn.Flatten()
        # 256 channels * 8 * 8 (from 64x64 downsampled 3 times -> 8x8)
        self.fc = nn.Linear(256 * 8 * 8, 256)

    def forward(self, x):
        x1 = self.inc(x)
        x2 = self.down1(x1)
        x3 = self.down2(x2)
        x4 = self.down3(x3)
        flat = self.flatten(x4)
        out = F.relu(self.fc(flat))
        return out

class UNet_LSTM_Bias(nn.Module):
    """
    Hybrid Architecture:
    1. U-Net Encoder processes the (64x64) spatial data.
    2. LSTM processes the (Sequence_Length x Num_CSV_Features) temporal tabular data.
    3. The outputs are concatenated and passed through MLP for final bias calibration.
    """
    def __init__(self, nc_channels=1, csv_features=11, lstm_hidden=128, unet_features=256):
        super(UNet_LSTM_Bias, self).__init__()
        
        # Spatial Encoder
        self.unet_encoder = UNetEncoder(n_channels=nc_channels)
        
        # Temporal Encoder
        self.lstm = nn.LSTM(input_size=csv_features, hidden_size=lstm_hidden, num_layers=2, batch_first=True, dropout=0.2)
        
        # Final Regressor (UNet + LSTM) -> Output (Predicted Rainfall or Bias Offset)
        self.fc1 = nn.Linear(unet_features + lstm_hidden, 256)
        self.fc2 = nn.Linear(256, 64)
        self.out = nn.Linear(64, 1) # Single regression output

    def forward(self, nc_data, csv_seq):
        """
        nc_data: [Batch, Channels, 64, 64]
        csv_seq: [Batch, Seq_Length, Features]
        """
        # Extract spatial features
        spatial_features = self.unet_encoder(nc_data) # [Batch, 256]
        
        # Extract temporal features
        lstm_out, (hn, cn) = self.lstm(csv_seq)
        # We take the output of the last time step
        temporal_features = lstm_out[:, -1, :] # [Batch, 128]
        
        # Combine
        combined = torch.cat((spatial_features, temporal_features), dim=1) # [Batch, 384]
        
        # Regress
        x = F.relu(self.fc1(combined))
        x = F.relu(self.fc2(x))
        pred = F.relu(self.out(x)) # ReLU ensures no negative rainfall prediction
        return pred
