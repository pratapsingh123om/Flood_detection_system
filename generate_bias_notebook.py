import nbformat as nbf

nb = nbf.v4.new_notebook()

text_1 = """# Spatio-Temporal U-Net: Bias Training Pipeline (Option A)
This notebook trains our advanced Spatio-Temporal U-Net to predict the **Bias** (error) of the OpenMeteo forecast, rather than raw rainfall.
We will:
1. Mount Google Drive.
2. Load the recent years (2021-2025) of ERA5 Ground Truth `.nc` data.
3. Fetch the OpenMeteo historical forecast archive for the exact same timeframe.
4. Calculate the Bias (`Truth - Forecast`).
5. Train the U-Net on this Bias target using Huber Loss.
6. Save the model to Drive."""

code_1 = """!pip install xarray netCDF4 geopandas rioxarray tensorflow openmeteo-requests requests-cache retry-requests"""

text_2 = """### 1. Initialize TPU & Mount Drive"""
code_2 = """import tensorflow as tf
import os

# Initialize TPU
try:
    tpu = tf.distribute.cluster_resolver.TPUClusterResolver() 
    tf.config.experimental_connect_to_cluster(tpu)
    tf.tpu.experimental.initialize_tpu_system(tpu)
    strategy = tf.distribute.TPUStrategy(tpu)
    print("TPU initialized successfully!")
except ValueError:
    print("No TPU found. Falling back to CPU/GPU.")
    strategy = tf.distribute.get_strategy()

# Mount Drive
try:
    from google.colab import drive
    drive.mount('/content/drive')
    data_dir = '/content/drive/MyDrive/RainCast_Data/'
except ImportError:
    data_dir = './Data/'
    os.makedirs(data_dir, exist_ok=True)"""

text_3 = """### 2. Load Ground Truth ERA5 (2021-2025)
Make sure you have your `.nc` and `_srtm.nc` files inside the `RainCast_Data` drive folder."""
code_3 = """import xarray as xr
import pandas as pd
import numpy as np

# Load the historical truth (ERA5) and DEM
try:
    ds_truth = xr.open_mfdataset(os.path.join(data_dir, 'indore_era5_*.nc'), combine='by_coords')
    ds_dem = xr.open_dataset(os.path.join(data_dir, 'indore_srtm.nc'))
    
    # Filter to 2021-2025 for Option A
    ds_truth = ds_truth.sel(time=slice('2021-01-01', '2025-01-01'))
    
    ds_truth = ds_truth.rio.write_crs('epsg:4326')
    ds_truth.rio.set_spatial_dims(x_dim='x', y_dim='y', inplace=True)
    print('Ground Truth Dataset Loaded:', ds_truth.dims)
except Exception as e:
    print("WARNING: Could not load data. Ensure files exist in /content/drive/MyDrive/RainCast_Data/")
    print(e)
    # Generating dummy data for demonstration if files are missing
    time_index = pd.date_range('2021-01-01', '2023-12-31', freq='D')
    lats = np.linspace(22.0, 23.0, 10)
    lons = np.linspace(75.0, 76.0, 10)
    ds_truth = xr.Dataset({
        'total_precipitation': (['time', 'y', 'x'], np.random.rand(len(time_index), 10, 10) * 50),
        'maximum_2m_air_temperature': (['time', 'y', 'x'], np.random.rand(len(time_index), 10, 10) * 15 + 25)
    }, coords={'time': time_index, 'y': lats, 'x': lons})
    
    ds_dem = xr.Dataset({
        'elevation': (['y', 'x'], np.random.rand(10, 10) * 500 + 400)
    }, coords={'y': lats, 'x': lons})"""

text_4 = """### 3. Fetch OpenMeteo Baseline Forecast
We pull the OpenMeteo archive for the centroid of our grid, and broadcast it spatially. (In production, you'd pull a grid of points)."""
code_4 = """import openmeteo_requests
import requests_cache
from retry_requests import retry

# Setup OpenMeteo client
cache_session = requests_cache.CachedSession('.cache', expire_after=-1)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

# We use the Historical Weather API which gives us ERA5/IFS reanalysis data as our "baseline"
url = "https://archive-api.open-meteo.com/v1/archive"

# Use the centroid of our bounding box
lat_center = float(ds_truth.y.mean())
lon_center = float(ds_truth.x.mean())
start_date = str(ds_truth.time.min().dt.strftime('%Y-%m-%d').values)
end_date = str(ds_truth.time.max().dt.strftime('%Y-%m-%d').values)

params = {
    "latitude": lat_center,
    "longitude": lon_center,
    "start_date": start_date,
    "end_date": end_date,
    "daily": ["precipitation_sum"],
    "timezone": "auto"
}

print(f"Fetching OpenMeteo baseline for {lat_center}, {lon_center} from {start_date} to {end_date}...")
responses = openmeteo.weather_api(url, params=params)
response = responses[0]
daily = response.Daily()
daily_precipitation_sum = daily.Variables(0).ValuesAsNumpy()

# Align the timeseries to our truth data
time_index = pd.date_range(
    start=pd.to_datetime(daily.Time(), unit="s"),
    end=pd.to_datetime(daily.TimeEnd(), unit="s"),
    freq=pd.Timedelta(seconds=daily.Interval()),
    inclusive="left"
)

om_df = pd.DataFrame(data={"time": time_index, "om_precip": daily_precipitation_sum})
om_df.set_index("time", inplace=True)
om_df = om_df[~om_df.index.duplicated()] # Remove duplicates

# Filter to match our exact truth dates
truth_dates = pd.to_datetime(ds_truth.time.values)
om_aligned = om_df.reindex(truth_dates).fillna(0).values

# Broadcast the 1D OpenMeteo forecast across our 2D spatial grid
# Shape: (Time, Lat, Lon)
om_tensor = np.zeros_like(ds_truth['total_precipitation'].values)
for t in range(om_tensor.shape[0]):
    om_tensor[t, :, :] = om_aligned[t, 0]

print("OpenMeteo Baseline Tensor Shape:", om_tensor.shape)"""

text_5 = """### 4. Calculate Bias & Prepare Input Tensors
Here is the core logic: `Bias = Truth - Baseline`"""
code_5 = """# The Target is the BIAS, not the raw precipitation!
truth_tensor = ds_truth['total_precipitation'].values
bias_tensor = truth_tensor - om_tensor

# The Inputs (X)
temp = ds_truth['maximum_2m_air_temperature'].values
elevation = ds_dem['elevation'].values

# Broadcast elevation across Time
elevation = np.expand_dims(elevation, axis=0)
elevation = np.repeat(elevation, truth_tensor.shape[0], axis=0)

# X_data channels: [OpenMeteo_Baseline, Temperature, Elevation]
X_data = np.stack([om_tensor, temp, elevation], axis=-1)
X_data = np.nan_to_num(X_data)

# Y_data is the Bias
Y_data = np.nan_to_num(bias_tensor)
Y_data = np.expand_dims(Y_data, axis=-1)

print('Input (X) Tensor shape:', X_data.shape)
print('Target (Y) Bias Tensor shape:', Y_data.shape)"""

text_6 = """### 5. Build & Train the Spatio-Temporal U-Net
We use **Huber Loss** because the bias can have extreme spikes, and Huber is robust to outliers."""
code_6 = """import tensorflow as tf

with strategy.scope():
    inputs = tf.keras.layers.Input(shape=(None, X_data.shape[1], X_data.shape[2], 3))
    
    # Encoder
    c1 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(inputs)
    c1 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(c1)
    
    # Bottleneck
    c2 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(128, (3, 3), activation='relu', padding='same'))(c1)
    
    # Decoder
    u1 = tf.keras.layers.Concatenate()([c2, c1])
    c3 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(u1)
    c3 = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'))(c3)
    
    # Temporal Smoothing (LSTM)
    shape = tf.keras.backend.int_shape(c3)
    flat = tf.keras.layers.Reshape((-1, shape[2] * shape[3] * shape[4]))(c3)
    lstm = tf.keras.layers.LSTM(shape[2] * shape[3] * shape[4], return_sequences=True)(flat)
    reshaped_lstm = tf.keras.layers.Reshape((-1, shape[2], shape[3], shape[4]))(lstm)
    
    # Output: Predicts BIAS
    outputs = tf.keras.layers.TimeDistributed(tf.keras.layers.Conv2D(1, (1, 1), activation='linear', padding='same'))(reshaped_lstm)
    
    model = tf.keras.Model(inputs=[inputs], outputs=[outputs])
    
    # CRITICAL: We use Huber loss which is robust to large bias outliers
    model.compile(optimizer='adam', loss=tf.keras.losses.Huber(delta=1.0), metrics=['mae'])

model.summary()"""

code_7 = """# Add a batch dimension (Batch, Time, Lat, Lon, Channels)
# In production, you would chunk the time dimension into rolling sequences (e.g., 7 days in, 1 day out).
# Here we just pass the entire sequence as a single batch for demonstration.
X_train = np.expand_dims(X_data, axis=0)
Y_train = np.expand_dims(Y_data, axis=0)

print("Training on shape:", X_train.shape)
history = model.fit(X_train, Y_train, epochs=20, batch_size=1)"""

text_8 = """### 6. Save the Bias Model"""
code_8 = """model_save_path = os.path.join(data_dir, 'unet_bias_model.h5')
model.save(model_save_path)
print(f"Model saved to: {model_save_path}")
print("Done! You can now load this model in your backend to predict the correction bias.")"""

nb['cells'] = [
    nbf.v4.new_markdown_cell(text_1),
    nbf.v4.new_code_cell(code_1),
    nbf.v4.new_markdown_cell(text_2),
    nbf.v4.new_code_cell(code_2),
    nbf.v4.new_markdown_cell(text_3),
    nbf.v4.new_code_cell(code_3),
    nbf.v4.new_markdown_cell(text_4),
    nbf.v4.new_code_cell(code_4),
    nbf.v4.new_markdown_cell(text_5),
    nbf.v4.new_code_cell(code_5),
    nbf.v4.new_markdown_cell(text_6),
    nbf.v4.new_code_cell(code_6),
    nbf.v4.new_code_cell(code_7),
    nbf.v4.new_markdown_cell(text_8),
    nbf.v4.new_code_cell(code_8)
]

with open('ERA5_TPU_Bias_Training.ipynb', 'w', encoding='utf-8') as f:
    nbf.write(nb, f)

print("Notebook generated successfully!")
