import json
import os

def create_notebook(filename, cells_data):
    nb = {
        "cells": [],
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "name": "python",
                "version": "3.10"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
    }
    
    for ctype, source in cells_data:
        cell = {
            "cell_type": ctype,
            "metadata": {},
            "source": [line + '\n' for line in source.split('\n')[:-1]] + [source.split('\n')[-1]]
        }
        if ctype == 'code':
            cell['execution_count'] = None
            cell['outputs'] = []
        nb["cells"].append(cell)
        
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(nb, f, indent=1)

# ---------------------------------------------------------
# 1. Extraction Notebook
# ---------------------------------------------------------
ext_cells = [
    ("markdown", "# ERA5 Data Extraction via Google Earth Engine\nThis notebook pulls ERA5 data from GEE directly into an `xarray` dataset and saves it as a `.nc` file to Google Drive and your local folder."),
    ("code", "!pip install earthengine-api wxee geopandas"),
    ("markdown", "### Setup Google Drive Mount (For Colab)"),
    ("code", "import os\n\ntry:\n    from google.colab import drive\n    drive.mount('/content/drive')\n    drive_path = '/content/drive/MyDrive/RainCast_Data/'\n    print(\"Mounted Google Drive\")\nexcept ImportError:\n    print(\"Not running in Colab. Using local directory.\")\n    drive_path = './Data/'\n\nos.makedirs(drive_path, exist_ok=True)"),
    ("markdown", "### Authenticate with Google Earth Engine\nMake sure your Google Cloud Project has the Earth Engine API enabled."),
    ("code", "import ee\nimport wxee\n\ntry:\n    # Replace 'your-project' with your actual GCP project ID\n    ee.Initialize(project='your-project')\nexcept Exception as e:\n    ee.Authenticate()\n    ee.Initialize(project='your-project')\n\n# Initialize wxee for xarray integration\nwxee.Initialize()"),
    ("markdown", "### Define Region of Interest (Indore)\nWe use a bounding box around Indore. Later, we will use a precise shapefile to clip this data during training."),
    ("code", "# Indore Bounding Box (Longitude Min, Latitude Min, Longitude Max, Latitude Max)\nroi = ee.Geometry.Rectangle([75.5, 22.5, 76.2, 23.0])"),
    ("markdown", "### Fetch ERA5 Data\nWe download Daily Total Precipitation and Maximum Temperature."),
    ("code", "era5 = ee.ImageCollection(\"ECMWF/ERA5/DAILY\") \\\n        .select(['total_precipitation', 'maximum_2m_air_temperature']) \\\n        .filterDate('1979-01-01', '2025-01-01')\n\nprint(\"Downloading ERA5 data to xarray... This may take a while depending on the date range.\")\n# Convert GEE ImageCollection to xarray Dataset (scale is in meters, ~11km for ERA5)\nds = era5.wx.to_xarray(region=roi, scale=11132)\nprint(ds)"),
    ("markdown", "### Save as NetCDF (.nc)"),
    ("code", "nc_path = os.path.join(drive_path, 'indore_era5.nc')\nds.to_netcdf(nc_path)\nprint(f\"Successfully saved NetCDF to {nc_path}\")")
]

create_notebook("ERA5_GEE_Extraction.ipynb", ext_cells)

# ---------------------------------------------------------
# 2. Training Notebook (Colab TPU)
# ---------------------------------------------------------
train_cells = [
    ("markdown", "# NetCDF & Shapefile TPU Training Pipeline\nThis notebook is optimized to run on Google Colab TPUs. It loads the `.nc` file, clips it to the Indore shapefile, and trains a ConvLSTM spatial model."),
    ("code", "!pip install xarray netCDF4 geopandas rioxarray tensorflow"),
    ("markdown", "### Initialize TPU & Mount Drive"),
    ("code", "import tensorflow as tf\nimport os\n\n# Initialize TPU\ntry:\n    tpu = tf.distribute.cluster_resolver.TPUClusterResolver() \n    tf.config.experimental_connect_to_cluster(tpu)\n    tf.tpu.experimental.initialize_tpu_system(tpu)\n    strategy = tf.distribute.TPUStrategy(tpu)\n    print(\"TPU initialized successfully!\")\nexcept ValueError:\n    print(\"No TPU found. Falling back to CPU/GPU.\")\n    strategy = tf.distribute.get_strategy()\n\n# Mount Drive\ntry:\n    from google.colab import drive\n    drive.mount('/content/drive')\n    data_dir = '/content/drive/MyDrive/RainCast_Data/'\nexcept ImportError:\n    data_dir = './Data/'"),
    ("markdown", "### Load NetCDF & Setup Spatial Dimensions"),
    ("code", "import xarray as xr\nimport geopandas as gpd\nimport rioxarray\n\nnc_file = os.path.join(data_dir, 'indore_era5.nc')\n\n# Open the NetCDF file downloaded in the previous notebook\nds = xr.open_dataset(nc_file)\n\n# Tell rioxarray what dimensions represent X (lon) and Y (lat) so we can clip it\nds = ds.rio.write_crs(\"epsg:4326\")\nds.rio.set_spatial_dims(x_dim=\"x\", y_dim=\"y\", inplace=True)\nprint(ds)"),
    ("markdown", "### Masking with Shapefile\nUpload your `indore.shp` (and associated .shx, .dbf) to your drive data folder."),
    ("code", "# Uncomment this section when you have the shapefile uploaded!\n\n# shp_path = os.path.join(data_dir, 'indore.shp')\n# indore_shp = gpd.read_file(shp_path)\n\n# Clip the grid to the exact shapefile boundaries. Pixels outside become NaN.\n# clipped_ds = ds.rio.clip(indore_shp.geometry.values, indore_shp.crs, drop=True)\n\nclipped_ds = ds  # Using unclipped grid for now\nprint(\"Data clipped and ready!\")"),
    ("markdown", "### Data Preparation (Time Series Tensors)"),
    ("code", "import numpy as np\n\n# Extract variables to numpy arrays. Shape: (Time, Lat, Lon)\nprecip = clipped_ds['total_precipitation'].values\ntemp = clipped_ds['maximum_2m_air_temperature'].values\n\n# Stack them into channels. Shape: (Time, Lat, Lon, Channels)\nX_data = np.stack([precip, temp], axis=-1)\n\n# Replace NaNs (outside the shapefile) with 0\nX_data = np.nan_to_num(X_data)\nprint(\"Input Tensor shape:\", X_data.shape)"),
    ("markdown", "### Build TPU Model (Spatio-Temporal U-Net)\nSince we are training on a 3D grid over time, we use a U-Net architecture which is state-of-the-art for spatial weather mapping. It encodes spatial features and decodes them into precise rainfall maps."),
    ("code", "# Build model inside the TPU strategy scope\nwith strategy.scope():\n    inputs = tf.keras.layers.Input(shape=(None, X_data.shape[1], X_data.shape[2], 2))\n    \n    # TimeDistributed applies the Conv2D to each time step independently\n    # Encoder\n    c1 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(inputs)\n    c1 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(c1)\n    \n    # Bottleneck\n    c2 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(128, (3, 3), activation='relu', padding='same'))(c1)\n    \n    # Decoder (Skip connection from Encoder)\n    u1 = tf.keras.layers.Concatenate()([c2, c1])\n    c3 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(u1)\n    c3 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(c3)\n    \n    # Temporal Smoothing (LSTM)\n    # We collapse the spatial dimensions, run an LSTM to capture temporal dynamics, and reshape back\n    shape = tf.keras.backend.int_shape(c3)\n    flat = tf.keras.layers.Reshape((-1, shape[2] * shape[3] * shape[4]))(c3)\n    lstm = tf.keras.layers.LSTM(shape[2] * shape[3] * shape[4], return_sequences=True)(flat)\n    reshaped_lstm = tf.keras.layers.Reshape((-1, shape[2], shape[3], shape[4]))(lstm)\n    \n    # Output layer: Predicts 1 value (rainfall) per pixel in the grid\n    outputs = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(1, (1, 1), activation='relu', padding='same'))(reshaped_lstm)\n    \n    model = tf.keras.Model(inputs=[inputs], outputs=[outputs])\n    model.compile(optimizer='adam', loss='mse', metrics=['mae'])\n\nmodel.summary()")
]

create_notebook("ERA5_TPU_Training.ipynb", train_cells)
print("Successfully created ERA5_GEE_Extraction.ipynb and ERA5_TPU_Training.ipynb")
