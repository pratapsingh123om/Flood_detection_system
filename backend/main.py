from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router import api_router

# Initialize FastAPI application
app = FastAPI(
    title="RainCast AI Backend",
    description="Backend API for predicting 7-day rainfall and flood risk.",
    version="1.0.0"
)

# Configure CORS to allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development purposes, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API router which contains all our endpoints
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    """
    Root endpoint for health checks.
    """
    return {"status": "ok", "message": "RainCast AI Backend is running"}
