"""
Google Earth Engine (GEE) Covariates Downloader for Google Colab
----------------------------------------------------------------
This script uses the Google Earth Engine Python API to extract High-Resolution 
Environmental Covariates (DEM and NDVI) for the Indore region and export them 
directly to your Google Drive as GeoTIFF files.

Instructions for Colab:
1. Run `!pip install earthengine-api geemap` if not already installed.
2. The script will prompt you to authenticate your Google account to use GEE.
3. The GeoTIFFs will be exported directly into your Google Drive root (or the specified folder).
"""

import ee
import time

def export_covariates_to_drive():
    # 1. Authenticate and Initialize GEE
    print("Authenticating Google Earth Engine...")
    try:
        ee.Initialize()
    except Exception as e:
        ee.Authenticate()
        ee.Initialize()
    
    print("Earth Engine Initialized Successfully!")

    # 2. Define the Region of Interest (ROI): Indore Bounding Box
    # [minLon, minLat, maxLon, maxLat] for Indore, Madhya Pradesh
    roi = ee.Geometry.Rectangle([75.70, 22.60, 76.05, 22.85])

    # ==========================================
    # 3. DIGITAL ELEVATION MODEL (DEM)
    # ==========================================
    print("\nFetching NASA SRTM Digital Elevation Model (30m Resolution)...")
    # NASADEM provides highly accurate 30m resolution elevation data
    dem_dataset = ee.Image('NASA/NASADEM_HGT/001').select('elevation')
    dem_clipped = dem_dataset.clip(roi)

    # ==========================================
    # 4. NORMALIZED DIFFERENCE VEGETATION INDEX (NDVI)
    # ==========================================
    print("Fetching Landsat 8 NDVI (30m Resolution) for average surface roughness...")
    # We take the median NDVI over a recent year to get a stable representation of the urban/vegetation split
    landsat = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2") \
                .filterBounds(roi) \
                .filterDate('2023-01-01', '2023-12-31') \
                .filter(ee.Filter.lt('CLOUD_COVER', 10))

    # Function to calculate NDVI for Landsat 8
    def add_ndvi(image):
        ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI')
        return image.addBands(ndvi)

    # Map the NDVI function, take the median to remove clouds, and clip to Indore
    ndvi_dataset = landsat.map(add_ndvi).select('NDVI').median()
    ndvi_clipped = ndvi_dataset.clip(roi)

    # ==========================================
    # 5. EXPORT TASKS TO GOOGLE DRIVE
    # ==========================================
    print("\nStarting Export Tasks to Google Drive...")
    
    # Export DEM Task
    task_dem = ee.batch.Export.image.toDrive(
        image=dem_clipped,
        description='Indore_DEM_30m',
        folder='BTP-COLAB',       # The folder in your Google Drive where it will save
        fileNamePrefix='indore_dem_30m',
        region=roi.getInfo()['coordinates'],
        scale=30,                 # 30-meter resolution
        crs='EPSG:4326',          # Standard WGS84 Lat/Lon
        maxPixels=1e9
    )
    task_dem.start()
    print("--> DEM Export Task Started (indore_dem_30m.tif)")

    # Export NDVI Task
    task_ndvi = ee.batch.Export.image.toDrive(
        image=ndvi_clipped,
        description='Indore_NDVI_30m',
        folder='BTP-COLAB',
        fileNamePrefix='indore_ndvi_30m',
        region=roi.getInfo()['coordinates'],
        scale=30,
        crs='EPSG:4326',
        maxPixels=1e9
    )
    task_ndvi.start()
    print("--> NDVI Export Task Started (indore_ndvi_30m.tif)")

    # Monitor Task Status
    print("\nWaiting for exports to complete (this may take a few minutes)...")
    while task_dem.active() or task_ndvi.active():
        print(f"DEM Status: {task_dem.status()['state']} | NDVI Status: {task_ndvi.status()['state']}")
        time.sleep(15)

    print("\n✅ All exports completed! Check your Google Drive /BTP-COLAB folder for the GeoTIFFs.")

if __name__ == "__main__":
    export_covariates_to_drive()
