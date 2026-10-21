# Rainfall-only Central India prototype

## Run on Kaggle
Attach only `satya1kamdev/raincast-central-india-001-1951-2025` and enable GPU.
Paste `RainCast_RainfallOnly_GPU_GCP.py` into ONE code cell, or execute it with `%run`.
It is standalone: no notebook variables, previous checkpoints, weather, DEM or QM refit.
Output: `/kaggle/working/RainCast_RainfallOnly_GPU_GCP/Run_<signature>`.
Rerun the unchanged script to resume. Keep that working folder, including Resume.pt and Cache.
GPU compute is used for training and evaluation; this does not train on all 75 years.
The sparse cache opens only 2006–2024 (~1.5 GiB at 109,506 cells), not 2025.
The launcher uses a child process, one CPU thread, a 6 GiB RAM watchdog and text progress bars.
The 13-hour invocation budget pauses cleanly; STOP file also requests a pause.
Save/download the model bundle before ending the runtime. Kaggle working files are not durable after session deletion.

## Model and scientific scope
Seven preceding rainfall maps plus their validity masks predict the next map in mm.
A shared, three-layer spatial CNN (width 24, 3x3 convolutions) works on all supported cells.
No coordinates, weather or future rainfall enter the model. Training samples one supported patch per eligible date per epoch, across all calendar months; neighbouring patches are correlated.
15 epochs maximum, early stop after four validations without improvement. FP32 and gradient clipping avoid AMP-overflow handling.
Training minimises scaled raw-mm squared error over a three-step recursive rollout.
Training patches include a nine-cell halo so that three model steps cannot contaminate the central loss with tile boundaries.
No intensity oversampling, class threshold tuning, extreme-value fitting, spatial smoothing or new QM is hidden here.
Squared-error point predictions can still underpredict extremes: this is a new baseline, not a promised fix for event severity.

Chronological split: train 2006–2018, validation 2019–2020, test 2021–2024.
The seven input days must precede all target days; future targets cannot cross a split boundary.
Validation uses 48 fixed monthly origins (days 8,22) with full-map three-day recursion.
Select the checkpoint by the mean squared RMSE at leads 1 and 3 on those validation origins only.
Test uses days 1,8,15,22 of each month (192 origins) with full-map seven-day recursion.
Test_Scores.csv contains each lead and next-three-day accumulated rainfall, amount bins, and persistence/monthly-climatology baselines.
For sum3 rows, the heavy threshold is 150 mm over three days; for daily rows it is 50 mm.
Tests are fixed-origin samples, NOT all daily forecasts and NOT a complete set of monthly/JJASO forecast totals.
Product-defined events are not measured-gauge events. The target is the saved station-derived CNN/QM product, not independent observed rainfall at 1 km.
2025 is reserved and never opened as truth. No gauge validation or operational certification is claimed.
Daily labels are retained; daily accumulation-window / issue-time alignment remains unverified.
Compare CNN with baselines on identical origins/support. Report poor scores if obtained; the exporter does not silently replace a failed model with a baseline.
Do not assume this rainfall-only model outperforms the prior weather-assisted model.

## Research basis and project choices
RainNet v1.0: Ayzel, Scheffer & Heistermann (2020), GMD 13,2631–2644, DOI:10.5194/gmd-13-2631-2020.
https://gmd.copernicus.org/articles/13/2631/2020/
Author code: https://github.com/hydrogo/rainnet
RainNet uses convolutional precipitation-history prediction with recursive application for radar nowcasting.
Our daily product, architecture, seven-day input, three-step loss, spatial support, splits and GPU budget are explicit PROJECT ADAPTATIONS; this is not an exact replication of RainNet, its temporal scale or its published results.
Recursion must be tested because rainfall-only forecasts can smooth and drift.
Cloud Run Jobs execute batch tasks and exit: https://docs.cloud.google.com/run/docs/create-jobs
Cloud Storage generation preconditions protect state publication: https://docs.cloud.google.com/storage/docs/request-preconditions
PyTorch state_dict serialization: https://docs.pytorch.org/tutorials/beginner/saving_loading_models.html

## After training: local use
Unzip RainfallOnly_GCP_Bundle.zip. It contains model.py, forecast.py, app.py, deploy.sh, Dockerfile, README, and bundle/ with weights, config, geometry and seed.
Install PyTorch, NumPy. Then:
`python forecast.py --bundle bundle --seed bundle/Historical_Seed.npz --out demo --days 3`
Each generated day has a compressed CSV with real lat/lon, original dense cell ID, forecast origin, target date, lead and rainfall_mm. It also has a sparse NPZ for efficient app reads.
Next_Seed.npz is the next seven-map rolling state. It retains the original forecast origin and last observed PRODUCT date, never relabels generated values as observations.
The included seed ends **2024-12-31**; it is a HISTORICAL replay, not a current 2026 forecast.
To forecast a 2026 interval, supply the actual seven immediately preceding product-equivalent maps. The package does not invent observations or obtain live IMD automatically.
Input seed NPZ schema: dates(datetime64[D],7), rain_mm(float32,7,N), is_observed(bool,7), forecast_origin(scalar ISO date), last_observed_date(scalar ISO date), geometry_hash(scalar).
For a fresh observed seed all seven flags are true and origin=last_observed_date=last date. Geometry and sparse-cell order must exactly match bundle/Geometry.npz.
Here is_observed means supplied product history, not independently measured 1 km observations.
Default recursion stops at total lead 7 from the last observed product date, including across restarts.
A 31-day simulation requires `--allow-experimental-long-rollout`; it is an unvalidated scenario, not a reliable one-month deterministic forecast.
No clipping to a maximum rainfall hides explosions; nonfinite values fail.

## GCP deployment
The Dockerfile pins CPU inference dependencies. The container build itself must be tested in your GCP project; it has not been built or deployed by this script.
Copy the TRAINED bundle to Cloud Shell, unzip, `cd` into it, set:
`export PROJECT_ID='your-project'; export BUCKET='your-unique-private-bucket'; export REGION='asia-south1'`
Then `bash deploy.sh`.
This creates a private bucket, Artifact Registry image, CPU Cloud Run generation job and private read-only API.
Billing, IAM and enabled APIs are required. The deploying account must have the corresponding resource-create, IAM-binding, build and service-account-user permissions.
The runtime service account receives storage.objectUser only on the dedicated bucket. Cloud Build uses your project's configured build service account and its build/push permissions.
No credentials are embedded. Cloud Run uses its assigned service account.
Run `gcloud run jobs execute rainfall-generate --region="$REGION" --wait` to generate the next three days.
Use Cloud Storage outputs directly for the app or call `/rainfall?date=2025-01-01&lat=23.0&lon=78.0` with an identity token via your backend.
`/metadata` exposes the latest run timeline. Requests use the containing supported cell and reject unsupported coordinates.
Cloud job writes immutable run files, then publishes state/latest.json using a generation precondition. Concurrent writers cannot overwrite a newer state pointer.
Job retries are disabled; a crash before publication may leave unused output files. It will not delete existing history.
The latest API serves only the latest job's generated dates; earlier run prefixes remain in the bucket.
Repeated manual job executions intentionally advance predicted state and remain anchored to the original observed date.
No automatic schedule is installed. Before scheduling, implement reliable ingestion of newly available observed/product-equivalent maps and reset the seed with validated dates. Without observations, a daily schedule is only an anchored simulation and will stop at lead 7.
For a new observed seed, upload it under a NEW seeds/ object, obtain its generation, and publish a new pointer with if-generation-match on the previous pointer. Never overwrite history or silently reset forecast dates.

## Read results before showing the app
Use Small_Review.zip for review. It includes training history, configuration/protocol, validation scores, test scores, export verification and status.
Use RainfallOnly_GCP_Bundle.zip for deployment. Checkpoint files are trusted-model artifacts; load only your own generated files.
An app display should say "experimental rainfall-only forecast" and show origin, lead and target date, not "observed rainfall" or "flood warning".
A 0.01-degree rainfall prediction does not by itself predict ward flooding; that requires hydrological/drainage exposure modelling and independent validation.
