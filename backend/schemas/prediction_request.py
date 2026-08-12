from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    """
    Schema for the incoming prediction request from the frontend dashboard.
    Contains hydrological parameters, location, and the selected model.
    """
    location: str = Field(..., description="The geographical location for prediction")
    model: str = Field(..., description="The ID/name of the ML model to use")
    timeframe: str = Field(default="month", description="Timeframe selected (e.g., 'month', 'year')")
    runoff: float = Field(..., description="Runoff Rate (mm/hr)")
    elevation: float = Field(..., description="Elevation (DEM) in meters")
    drainage: float = Field(..., description="Drainage Capacity percentage")
