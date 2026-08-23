from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from schemas.ward_flood_risk import WardFloodRisk

class ClimateAtmosphericTensor(BaseModel):
    tmax_degC: float               # 1. Tmax (°C)
    tmin_degC: float               # 1. Tmin (°C)
    dewpoint_degC: float           # 2. Dew-point temperature (°C)
    humidity_pct: float            # 3. Relative humidity (%)
    sw_radiation_wm2: float        # 4. Shortwave radiation (W/m^2)
    lw_radiation_wm2: float        # 5. Longwave radiation (W/m^2)
    wind_speed_ms: float           # 6. Wind speed: sqrt(U^2 + V^2) (m/s)
    wind_u_ms: float               # 7. Wind U vector component (m/s)
    wind_v_ms: float               # 7. Wind V vector component (m/s)
    surface_pressure_hpa: float    # 8. Sea-level / Surface pressure (hPa)
    geopotential_height_m: float   # 9. Geopotential height 500hPa (gpm)

class ForecastDay(BaseModel):
    day: Optional[str] = None
    date: Optional[str] = None
    temp: float
    rain: float
    icon: str
    intensity: float
    wind_speed: Optional[float] = 12.5
    humidity: Optional[float] = 78.0
    is_fallback: Optional[bool] = False
    climate_tensor: Optional[ClimateAtmosphericTensor] = None

class TestDataPoint(BaseModel):
    date: str
    actual: float
    predicted: float
    threshold: Optional[float] = 10.0
    openmeteo: Optional[float] = None
    default_cmip: Optional[float] = None
    climate_tensor: Optional[ClimateAtmosphericTensor] = None

class HydrologicalMetrics(BaseModel):
    rmse: float
    mae: float
    r2_score: float
    matching_pct: float
    csi: float
    pod: float
    far: float
    nse: float

class IPCCFrameworkSummary(BaseModel):
    hazard_mean: float          # Average city-wide Hazard index (0-100)
    vulnerability_mean: float   # Average city-wide Vulnerability index (0-100)
    exposure_mean: float        # Average city-wide Exposure index (0-100)
    ipcc_risk_composite: float  # Composite AHP weighted risk (0.80H + 0.15V + 0.05E)
    ahp_weights: Dict[str, float] = {"hazard": 0.80, "vulnerability": 0.15, "exposure": 0.05}
    high_risk_wards_count: int
    moderate_risk_wards_count: int
    low_risk_wards_count: int
    total_population_at_risk: str

class PredictionResponse(BaseModel):
    test_data: List[TestDataPoint]
    weather_forecast: List[ForecastDay]
    metrics: List[Dict[str, Any]]
    risk_areas: List[Dict[str, Any]]
    ward_risks: Optional[List[WardFloodRisk]] = []
    hydro_summary: Optional[HydrologicalMetrics] = None
    ipcc_summary: Optional[IPCCFrameworkSummary] = None
    cmip6_comparison: Optional[Dict[str, Any]] = None

