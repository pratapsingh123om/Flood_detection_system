from fastapi.testclient import TestClient
from main import app
import time
import asyncio

client = TestClient(app)

print("Starting inference microservice test...")

with TestClient(app) as client:
    print("Testing Health Check Endpoint...")
    response = client.get("/")
    print("Response:", response.json())
    assert response.status_code == 200

    print("\nTesting /predict_bias Endpoint...")
    req_data = {"location": "Indore"}
    start_time = time.time()
    response = client.post("/predict_bias", json=req_data)
    end_time = time.time()

    print(f"Request took {(end_time - start_time)*1000:.2f} ms")
    print("Response JSON:")
    print(response.json())
    assert response.status_code == 200
    assert "bias_correction" in response.json()

    print("\nBackend Integration Test Passed Successfully!")
