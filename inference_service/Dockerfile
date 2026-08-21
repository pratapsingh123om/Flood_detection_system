FROM python:3.10-slim

WORKDIR /app

# Copy requirements and install
COPY inference_service/requirements.txt .
RUN pip install --default-timeout=1000 --no-cache-dir -r requirements.txt

# Copy the inference service code
COPY inference_service/ /app/

# Copy the models directory into the container
COPY models/ /models/
ENV TABULAR_MODELS_DIR=/models/Models_new

# Expose port
EXPOSE 8000

# Start FastAPI using Uvicorn
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
