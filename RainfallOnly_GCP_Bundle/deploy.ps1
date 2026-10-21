# Windows PowerShell deployment script for Google Cloud Platform
param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectId,
    [Parameter(Mandatory=$true)]
    [string]$Bucket,
    [string]$Region = "asia-south1",
    [switch]$AllowUnauthenticated
)

$ErrorActionPreference = "Stop"

Write-Host "==> Configuring GCP Project: $ProjectId" -ForegroundColor Cyan
gcloud config set project $ProjectId

Write-Host "==> Enabling required GCP services..." -ForegroundColor Cyan
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com storage.googleapis.com

$SA = "rainfall-demo@$ProjectId.iam.gserviceaccount.com"
Write-Host "==> Ensuring service account $SA..." -ForegroundColor Cyan
try {
    gcloud iam service-accounts describe $SA 2>$null
} catch {
    gcloud iam service-accounts create rainfall-demo --display-name="Rainfall Only Service Account"
}

Write-Host "==> Ensuring GCS bucket gs://$Bucket..." -ForegroundColor Cyan
try {
    gcloud storage buckets describe "gs://$Bucket" 2>$null
} catch {
    gcloud storage buckets create "gs://$Bucket" --location=$Region --uniform-bucket-level-access
}

gcloud storage buckets add-iam-policy-binding "gs://$Bucket" --member="serviceAccount:$SA" --role="roles/storage.objectUser"

Write-Host "==> Checking initial state in bucket..." -ForegroundColor Cyan
try {
    gcloud storage objects describe "gs://$Bucket/state/latest.json" 2>$null
} catch {
    Write-Host "==> Bootstrapping initial historical seed..." -ForegroundColor Yellow
    gcloud storage cp --if-generation-match=0 bundle/Historical_Seed.npz "gs://$Bucket/seeds/Historical_Seed.npz"
    $SeedGen = (gcloud storage objects describe "gs://$Bucket/seeds/Historical_Seed.npz" --format='value(generation)').Trim()
    $StateJson = @{
        seed_object = "seeds/Historical_Seed.npz"
        seed_generation = [int64]$SeedGen
    } | ConvertTo-Json
    $StateJson | Out-File -Encoding utf8 initial-state.json
    gcloud storage cp --if-generation-match=0 initial-state.json "gs://$Bucket/state/latest.json"
    Remove-Item initial-state.json -Force -ErrorAction SilentlyContinue
}

Write-Host "==> Ensuring Artifact Registry repository..." -ForegroundColor Cyan
try {
    gcloud artifacts repositories describe rainfall --location=$Region 2>$null
} catch {
    gcloud artifacts repositories create rainfall --repository-format=docker --location=$Region
}

$Timestamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddHHmmss")
$Image = "$Region-docker.pkg.dev/$ProjectId/rainfall/demo:$Timestamp"

Write-Host "==> Building and pushing container image: $Image..." -ForegroundColor Cyan
gcloud builds submit --tag $Image .

Write-Host "==> Deploying Cloud Run Job: rainfall-generate..." -ForegroundColor Cyan
gcloud run jobs deploy rainfall-generate `
    --image=$Image `
    --region=$Region `
    --service-account=$SA `
    --cpu=2 `
    --memory=4Gi `
    --task-timeout=3600s `
    --max-retries=0 `
    --tasks=1 `
    --parallelism=1 `
    --command=python `
    --args=forecast.py `
    --set-env-vars="BUCKET=$Bucket,DAYS=3,CPU_THREADS=1"

$AuthFlag = if ($AllowUnauthenticated) { "--allow-unauthenticated" } else { "--no-allow-unauthenticated" }

Write-Host "==> Deploying Cloud Run Service: rainfall-api..." -ForegroundColor Cyan
gcloud run deploy rainfall-api `
    --image=$Image `
    --region=$Region `
    --service-account=$SA `
    --cpu=1 `
    --memory=1Gi `
    --concurrency=1 `
    --max-instances=2 `
    $AuthFlag `
    --command=gunicorn `
    --args=--bind=0.0.0.0:8080,--workers=1,--timeout=120,app:app `
    --set-env-vars="BUCKET=$Bucket"

Write-Host "`n Deployment complete!" -ForegroundColor Green
Write-Host "Trigger a historical rollout job with: gcloud run jobs execute rainfall-generate --region=$Region --wait"
