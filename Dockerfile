# Use a lightweight python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies first (to leverage Docker caching)
COPY backend/requirements.txt .
RUN apt-get update && apt-get install -y libgomp1 && rm -rf /var/lib/apt/lists/*
RUN pip install --default-timeout=1000 --no-cache-dir -r requirements.txt

# Copy the application, models, and data
COPY backend/ ./backend/
COPY models/ ./models/
COPY Data/ ./Data/

# Set the working directory to backend where main.py is located
WORKDIR /app/backend

# Render uses port 10000 by default. Expose it.
EXPOSE 10000

# Start the FastAPI server on port 10000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
