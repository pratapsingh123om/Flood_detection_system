from pydantic import BaseModel
from typing import List

class ForecastDay(BaseModel):
    day: str
    temp: float
    rain: float
    icon: str
    intensity: float

class TestDataPoint(BaseModel):
    date: str
    actual: float
    predicted: float
    threshold: float
    openmeteo: float | None = None

class PredictionResponse(BaseModel):
    test_data: List[TestDataPoint]
    weather_forecast: List[ForecastDay]
    metrics: list
    risk_areas: list
