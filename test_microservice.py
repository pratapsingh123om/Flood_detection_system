import requests

response = requests.post(
    "https://raincast-backend-ml-model-775429752478.asia-southeast1.run.app/predict_unet",
    json={"location": "Indore, Madhya Pradesh"},
    timeout=60
)
print("Status:", response.status_code)
print("Body:", response.text)
