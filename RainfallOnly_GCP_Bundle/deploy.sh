#!/usr/bin/env bash
# Run in Google Cloud Shell after unzipping the TRAINED GCP bundle.
# This creates billable resources only when YOU execute these commands.
set -euo pipefail
: "${PROJECT_ID:?Set PROJECT_ID}" "${BUCKET:?Set a globally unique BUCKET name}"
REGION="${REGION:-asia-south1}"
gcloud config set project "$PROJECT_ID"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com storage.googleapis.com
SA="rainfall-demo@$PROJECT_ID.iam.gserviceaccount.com"
gcloud iam service-accounts describe "$SA" >/dev/null 2>&1 || gcloud iam service-accounts create rainfall-demo
if ! gcloud storage buckets describe "gs://$BUCKET" >/dev/null 2>&1; then
  gcloud storage buckets create "gs://$BUCKET" --location="$REGION" --uniform-bucket-level-access
fi
gcloud storage buckets add-iam-policy-binding "gs://$BUCKET" --member="serviceAccount:$SA" --role=roles/storage.objectUser
# Bootstrap exactly once: never overwrite an existing seed pointer on redeploy.
if ! gcloud storage objects describe "gs://$BUCKET/state/latest.json" >/dev/null 2>&1; then
  gcloud storage cp --if-generation-match=0 bundle/Historical_Seed.npz "gs://$BUCKET/seeds/Historical_Seed.npz"
  SEED_GEN=$(gcloud storage objects describe "gs://$BUCKET/seeds/Historical_Seed.npz" --format='value(generation)')
  python - "$SEED_GEN" <<'PY'
import json,sys
open('initial-state.json','w').write(json.dumps({'seed_object':'seeds/Historical_Seed.npz','seed_generation':int(sys.argv[1])}))
PY
  gcloud storage cp --if-generation-match=0 initial-state.json "gs://$BUCKET/state/latest.json"
fi
gcloud artifacts repositories describe rainfall --location="$REGION" >/dev/null 2>&1 || gcloud artifacts repositories create rainfall --repository-format=docker --location="$REGION"
IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/rainfall/demo:$(date -u +%Y%m%d%H%M%S)"
gcloud builds submit --tag "$IMAGE" .
gcloud run jobs deploy rainfall-generate --image="$IMAGE" --region="$REGION" --service-account="$SA" --cpu=2 --memory=4Gi --task-timeout=3600s --max-retries=0 --tasks=1 --parallelism=1 --command=python --args=forecast.py --set-env-vars="BUCKET=$BUCKET,DAYS=3,CPU_THREADS=1"
ALLOW_AUTH_FLAG="--no-allow-unauthenticated"
if [ "${ALLOW_UNAUTHENTICATED:-false}" = "true" ]; then
  ALLOW_AUTH_FLAG="--allow-unauthenticated"
fi
gcloud run deploy rainfall-api --image="$IMAGE" --region="$REGION" --service-account="$SA" --cpu=1 --memory=1Gi --concurrency=1 --max-instances=2 $ALLOW_AUTH_FLAG --command=gunicorn --args=--bind=0.0.0.0:8080,--workers=1,--timeout=120,app:app --set-env-vars="BUCKET=$BUCKET"
echo 'Ready. Generate a historical replay using: gcloud run jobs execute rainfall-generate --region='"$REGION"' --wait'
echo 'The API endpoint can be tested with: curl "https://<SERVICE_URL>/predict_7days?location=Indore"'
