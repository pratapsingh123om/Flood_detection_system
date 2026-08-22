from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from schemas.ward_flood_risk import WardFloodRisk

class ForecastDay(BaseModel):
    day: Optional[str] = None
    date: Optional[str] = None
    temp: float
    rain: float
    icon: str
    intensity: float
    wind_speed: Optional[float] = 12.5
    humidity: Optional[float] = 78.0

class TestDataPoint(BaseModel):
    date: str
    actual: float
    predicted: float
    threshold: Optional[float] = 10.0
    openmeteo: Optional[float] = None
    default_cmip: Optional[float] = None

class HydrologicalMetrics(BaseModel):
    rmse: float
    mae: float
    r2_score: float
    matching_pct: float
    csi: float
    pod: float
    far: float
    nse: float

class PredictionResponse(BaseModel):
    test_data: List[TestDataPoint]
    weather_forecast: List[ForecastDay]
    metrics: List[Dict[str, Any]]
    risk_areas: List[Dict[str, Any]]
    ward_risks: Optional[List[WardFloodRisk]] = []
    hydro_summary: Optional[HydrologicalMetrics] = None
    cmip6_comparison: Optional[Dict[str, Any]] = None
