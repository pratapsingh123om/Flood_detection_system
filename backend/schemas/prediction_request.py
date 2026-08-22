from pydantic import BaseModel, Field
from typing import Optional

class PredictionRequest(BaseModel):
    """
    Schema for incoming prediction requests from the frontend dashboard.
    Contains location, municipal ward_id, hydrological parameters, persona, and model choice.
    """
    location: str = Field(default="Indore", description="Target city or municipal region")
    ward_id: Optional[int] = Field(default=None, description="Optional municipal ward number (1 to 85)")
    model: str = Field(default="unet_lstm_bias", description="Selected ML model architecture")
    baseline_model: str = Field(default="MPI_ESM1_2_XR", description="CMIP6 baseline climate model")
    timeframe: str = Field(default="7day", description="Prediction timeframe: '7day', 'month', 'year'")
    runoff: float = Field(default=0.45, ge=0.0, le=1.0, description="Surface runoff coefficient")
    elevation: float = Field(default=553.0, description="Average elevation in meters")
    drainage: float = Field(default=65.0, ge=0.0, le=100.0, description="Municipal drainage efficiency index (0-100 or 0-1)")
    persona: Optional[str] = Field(default="planner", description="Dashboard view persona: 'hydrologist' or 'planner'")
