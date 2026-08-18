from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router import api_router

# Initialize FastAPI application
print("\n" + "="*50)
print("🚀 RAINCAST BACKEND DEPLOYED - v1.0.5")
print("🔥 INCLUDES: Aug 18 Test Data, Bias Scaling Fix (x10), & OpenMeteo Alignment!")
print("="*50 + "\n")

app = FastAPI(
    title="RainCast AI Backend",
    description="Backend API for predicting 7-day rainfall and flood risk.",
    version="1.0.5"
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
    return {"status": "ok", "message": "RainCast AI Backend v1.0.5 is running"}
