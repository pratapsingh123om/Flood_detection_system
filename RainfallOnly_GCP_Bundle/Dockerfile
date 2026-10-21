FROM python:3.12-slim
WORKDIR /app
ENV OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 CPU_THREADS=1 PYTHONUNBUFFERED=1
RUN pip install --no-cache-dir torch==2.8.0 --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir numpy==2.2.6 Flask==3.1.1 gunicorn==23.0.0 google-cloud-storage==3.1.0
COPY . /app
EXPOSE 8080
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "1", "--timeout", "120", "app:app"]
