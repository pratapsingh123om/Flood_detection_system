from pydantic import BaseModel
from typing import Optional, Dict, List

class SoilMoistureStrata(BaseModel):
    depth_5m_pct: float
    depth_10m_pct: float
    depth_20m_pct: float

class WardFloodRisk(BaseModel):
    """
    Schema for localized municipal ward flood risk assessment based on IPCC Disaster Risk Framework:
    Risk = Hazard (H) x Vulnerability (V) x Exposure (E) with AHP Multi-criteria weighting (0.80, 0.15, 0.05).
    """
    ward_id: int
    ward_name: str
    latitude: float
    longitude: float
    elevation_m: float
    drainage_capacity_mm: float
    predicted_rain_mm: float
    runoff_mm: float
    water_depth_cm: float
    risk_level: str   # 'HIGH' (Red), 'MODERATE' (Amber), 'LOW' (Green)
    color_hex: str    # '#EF4444', '#F59E0B', '#10B981'

    # IPCC Disaster Risk Components
    hazard_score: float         # H = R (SCS-CN) x Wet Days (W) x Slope (S) (normalized 0-100)
    vulnerability_score: float  # V = D x NDVI x NDWI x E x TPI (normalized 0-100)
    exposure_score: float       # E = Population Density x GHSL growth factor (normalized 0-100)
    ipcc_risk_score: float      # Composite Risk: (0.80 x H + 0.15 x V + 0.05 x E) (0-100)
    
    # Detailed Physical & Environmental Parameters
    dist_to_water_m: float      # Euclidean distance to nearest river/drainage body (m)
    tpi_value: float            # Topographic Position Index (TPI: < -1 valley, -1 to 1 flat, > 1 ridge)
    tpi_category: str           # 'Valley / Low Sink', 'Flat Plain / Mid-slope', 'Ridge / High Ground'
    ndvi: float                 # Normalized Difference Vegetation Index (-0.1 to 0.8)
    ndwi: float                 # Normalized Difference Water Index (-0.5 to 0.6)
    slope_pct: float            # Terrain slope percentage (%)
    wet_days_count: int         # Antecedent wet days index (consecutive days with rain > 2.5mm)
    population_density: int     # Persons per km^2 (Census 2011 / GHSL)
    soil_moisture: SoilMoistureStrata # Multi-depth soil moisture: 5m, 10m, 20m
    lulc_category: str          # 'High-density Built-up', 'Paved Commercial', 'Vegetation & Parks', 'Water Buffer'

