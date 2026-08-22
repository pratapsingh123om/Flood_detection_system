from pydantic import BaseModel
from typing import Optional

class WardFloodRisk(BaseModel):
    """
    Schema for localized municipal ward flood risk assessment.
    Represents 2D runoff, standing water depth (cm), and stoplight hazard status per ward.
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
    risk_level: str   # 'HIGH' (>50cm), 'MODERATE' (20-50cm), 'LOW' (<20cm)
    color_hex: str    # '#EF4444' (Red), '#F59E0B' (Amber), '#10B981' (Green)
