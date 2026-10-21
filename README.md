# RainCast Central India

Location-based rainfall intelligence for Central India: explore any coordinate, view a seven-day spatial rainfall forecast from our live RainNet CNN model, and evaluate IPCC-aligned flood risk.

RainCast brings rainfall data preparation, spatial downscaling, autoregressive forecasting, hydrological flood assessment, and a modern map-based web experience into one integrated platform. The active operational model is strictly tailored to the **Central India spatial domain** (`20.63°N–26.87°N`, `74.63°E–82.87°E`, spanning 108,746 supported cells at 0.01° / ~1 km resolution), covering Madhya Pradesh and key river catchments (Narmada, Betwa, Chambal, Shipra, Kahn).

---

## 🚀 Live Cloud Architecture & Deployed Services

| Service | Platform | Live URL / Endpoint | Role |
| :--- | :--- | :--- | :--- |
| **RainNet Spatial CNN** | Google Cloud Run | [`raincastmodels`](https://raincastmodels-1011762612859.europe-west1.run.app) | Dedicated PyTorch microservice serving 7-day downscaled recursive forecasts (`/health`, `/predict_7days`, `/metadata`). |
| **Main API & Flood Engine** | Render (Docker) | [`raincast-backend`](https://raincast-backend-fqrk.onrender.com) | FastAPI backend serving IPCC Disaster Risk assessments, ward vulnerability indices, and CMIP6 climate downscaling. |
| **Interactive Dashboard** | Vite + React + Leaflet | Frontend Application | Interactive map clamped to Central India coordinates, querying the live RainNet CNN model in real-time. |
| **State & Run Storage** | Google Cloud Storage | `gs://$BUCKET` | Durable rolling seed states (`seeds/Historical_Seed.npz`) and atomic CAS pointer updates (`state/latest.json`). |

---

## ⚡ Quickstart & Local Docker Stack

Run the entire 3-tier microservice architecture locally with a single command:

```bash
docker compose up --build -d
```

* **FastAPI Backend**: `http://localhost:8080` (API docs at `/docs`)
* **RainNet Spatial Microservice**: `http://localhost:8081` (Health check at `/health`)
* **Inference Microservice**: `http://localhost:8000`

Test all live endpoints:
```bash
python test_render.py https://raincast-backend-fqrk.onrender.com
```

---

## 1. Project Objective

Built a high-resolution rainfall forecasting platform for Central India that answers three practical questions:

1. **How much rainfall is forecast at a selected location over the next seven days?**  
   Predicted via an autoregressive 3-layer spatial CNN (`RainfallOnly_RainNet_CNN`, 24 channels, 7-day rolling history) over 108,746 supported 1 km cells.

2. **What is the localized flood and waterlogging risk?**  
   Evaluated using the IPCC Disaster Risk Framework (Hazard × Vulnerability × Exposure) weighted with AHP across 85 municipal wards and regional basins.

3. **How were the underlying models trained and audited?**  
   Trained on 2006–2018 historical data, validated on 2019–2020, and tested out-of-sample on 2021–2024 with zero data leakage.

---

## 2. Product Experience

Main user journey: **Methodology landing page → Open dashboard → Click Central India location → Live 7-day model forecast & flood risk → Inspect validation metrics.**


Methodology section, step by step

Collect the source data. Obtain IMD rainfall and temperature, CHIRPS rainfall, NASA rainfall and land-surface products, and the auxiliary meteorological variables available to the project.

Audit the downloads. Check date coverage, file readability, duplicates, missing observations, units, coordinates, and product versions.

Align space and time. Reconcile grid coordinates, masks, rainfall accumulation windows, and date labels before pairing products.

Prepare supervised examples. Use native IMD rainfall as the coarse magnitude and CHIRPS as the spatial-pattern reference.

Downscale with Stacked SRCNN. Refine an interpolated rainfall field through stacked convolutional stages.

Conserve the IMD magnitude. Apply a differentiable constraint so the area-weighted mean of each nested 5×5 child block matches its IMD parent.

Evaluate the finer estimates. Compare with conservative interpolation baselines and held-out reference data; use IMERG as an external product comparison.

Build forecasting sequences. Assemble recent rainfall and eligible atmospheric and surface variables, using only information available at the forecast issue time.

Train and evaluate seven-day forecasts. Predict Day 1 through Day 7 and measure performance separately at each lead time.

Serve the location forecast. Publish versioned model outputs through the API and display them on the dashboard with issue time, coverage, and evaluation context.

Each step has a short explanation and an expandable technical detail panel. A second Open dashboard button appears after the methodology.

Research and transparency section

Explain the distinction between observations, reanalysis, downscaled estimates, and forecasts. Link to source documentation and the Model Performance page. Display flood-risk prediction as Pending, without showing example risk scores as real outputs.

Page 2 — Rainfall dashboard /dashboard

Header and location controls

The dashboard opens with an India-map banner and a prominent location search bar. On desktop, a sidebar contains location details and filters; the main panel contains the interactive map and forecast results. On mobile, location search remains at the top, followed by the map and forecast cards.

Users can select a location by:

Searching a village, town, city, district, or state and choosing a resolved result.

Entering latitude and longitude in separate labeled fields.

Clicking directly on the map to place a marker.

Ambiguous names produce a list of matches with state and district context. Coordinates are validated and checked against the supported domain and model mask. For an unsupported location, show “Forecast unavailable for this location” and an explanation.

Display both the requested coordinates and the actual model-grid coordinates used. A point selection represents the corresponding supported grid cell; it is not a measurement at an exact building or street.

Interactive India map

India-centered initial extent, zoom controls, selected-location marker, and state boundaries.

Rainfall overlay for the selected forecast day, when a valid forecast run exists.

Day 1–Day 7 selector updates the map and location chart together.

Legend reports the rainfall unit and color scale.

Hover or selection shows the grid-cell forecast and valid date.

Missing cells have a distinct appearance from zero rainfall.

The map, cards, chart, and table all use the same forecast run ID.

Seven-day forecast panel

Show seven daily cards. Each card contains:

Field

Meaning

Valid date and lead day

Which future daily accumulation window the forecast describes

Predicted rainfall

Rainfall depth in mm over that window

Rain probability

Only available when the forecast model supplies an evaluated probability

Prediction interval

Only available when an uncertainty method has been fitted and evaluated

Availability status

Available, missing, stale, or outside coverage

A linked chart shows the seven daily rainfall values. An accessible table presents the same information. A seven-day total is shown only when all seven required daily values are available.

The panel also shows forecast issue time, last data update, model version, and the accumulation-window convention. Dates can be displayed in local time, while the underlying interval remains explicit.

Accuracy and performance panel

Display historical evaluation results, with a link to the complete metrics page. Identify the evaluation region, period, reference dataset, sample count, model version, and forecast lead time.

Do not label historical model skill as the accuracy of an individual future day. The actual error of a forecast can be measured only after a reference observation becomes available.

Where no reliable local evaluation exists, show regional or national evaluation with its scope clearly stated. Use “Not evaluated” for missing metrics.

Flood-risk panel — pending

Show a visible card titled “Flood-risk prediction — coming later.” Describe the planned integration of rainfall, antecedent soil moisture, terrain, drainage, and hydrological response. Keep the risk score, warning categories, and alert controls disabled until this module is implemented and validated.

Rainfall intensity alone is not a validated flood-risk prediction.

Downloads and sharing

Export a CSV containing the selected location, forecast run ID, issue time, valid intervals, rainfall values, and available uncertainty fields.

Download the forecast chart.

Share a dashboard URL such as /dashboardlat=22.72&lon=75.86&lead=1.

Preserve location and lead-day selection after refreshing the page.

Page 3 — Model performance /performance

Provide separate tabs for Downscaling evaluation and Rainfall forecast evaluation.

The downscaling tab compares the learned output with conservative bilinear and bicubic baselines. It includes conservation residuals, spatial agreement, rainfall-event metrics, and reference-product limitations.

The forecasting tab reports Day 1–Day 7 skill separately and compares the model with appropriate persistence and climatology baselines. Filters cover region, season, lead time, and rainfall threshold.

Metric

What it explains

MAE

Average absolute rainfall error in mm

RMSE

Rainfall error with greater sensitivity to large misses

Correlation

Agreement in variation; reported as temporal, spatial, or pooled

NSE

Squared-error skill against the specified reference-mean benchmark

KGE

Combined correlation, variability, and mean-bias agreement

Bias

Systematic overestimation or underestimation

POD

Fraction of reference rainfall events detected

FAR

Fraction of predicted rainfall events that did not occur in the reference

CSI

Event agreement accounting for misses and false alarms

Balanced accuracy

Average sensitivity and specificity

FSS

Spatial neighborhood agreement at declared scales and thresholds

Each evaluation states its sample unit and aggregation method. Confidence intervals should account for dependence in the sampled data. If probabilistic forecasts are implemented, add reliability diagrams and proper probability scores.

Existing experimental evidence

These are historical research diagnostics, not seven-day forecast accuracy:

Experiment

Reported result

Interpretation

IMD–IMERG, same-date comparison at IMD support

Correlation 0.435; NSE −0.306

Original date pairing had weak agreement

IMD index d+1 versus IMERG date d

Correlation 0.707; NSE 0.329

Shifted pairing substantially improved agreement

Temporal consistency audit on the same 120 sampled dates

Positive correlation improvement in 5/5 years, 4/4 seasons, 6/6 diagnostic regions

Strong consistency evidence; not a new independent test set

Corrected SRCNN, epoch 3 validation

RMSE 12.5282 versus 12.8140 for the best conservative interpolation

About 2.23% lower RMSE against the constructed spatial target

Corrected SRCNN conservation at epoch 3 validation

Maximum residual 0.000015 mm

Parent rainfall preserved within numerical tolerance

Seven-day forecasting

Not established in the supplied logs

Requires a dedicated forecasting evaluation

The temporal audit directly compared IMD with IMERG. Applying the same pairing to CHIRPS is a working alignment choice that also needs direct IMD–CHIRPS verification. Daily shifting does not exactly reconstruct a different subdaily accumulation window.

Page 4 — About the data /data

Document source provenance, product version, native grid, temporal frequency, local coverage, units, missing periods, and transformations. Availability is product-specific; all variables must not be presented as available throughout 1951–2025.

Source or variable group

Role

IMD rainfall

Coarse rainfall magnitude, historical rainfall input, and a reference source

IMD Tmax and Tmin

Temperature context for forecasting experiments

CHIRPS

Spatial-pattern supervision and held-out reference-product comparison

NASA IMERG

External rainfall-product comparison

SRTM

Elevation and derived terrain information

MODIS land cover and tree cover

Land-surface and vegetation context

MODIS vegetation indices

Vegetation state at the product's own observation frequency

ERA5 / ERA5-Land, where audited and available

Candidate humidity, dewpoint, wind, pressure, radiation, soil-moisture, and evaporation inputs

Feature selection is established through ablation and sensitivity experiments. Candidate data availability does not mean every variable is included in the final model.

3. Proposed frontend structure

Stack assumption: React, TypeScript, Vite, a map-rendering library, a chart library, and a query/cache layer for API data. Styling can use Tailwind CSS. These choices describe the intended implementation rather than verified installed dependencies.

Path under frontend/src/

Responsibility

app/router.tsx

Landing, dashboard, performance, and data routes

app/providers.tsx

Query client, theme, error handling, shared application providers

pages/LandingPage.tsx

Hero, methodology sequence, research context, dashboard navigation

pages/DashboardPage.tsx

Location state, forecast run selection, map and result layout

pages/PerformancePage.tsx

Evaluation filters, baseline comparisons, metrics and uncertainty

pages/DataPage.tsx

Dataset catalog, coverage and methodology notes

components/layout/

Header, navigation, sidebar, footer, responsive containers

components/location/

Place search, coordinate form, location summary and validation

components/map/

India map, marker, rainfall overlay, legend and day selector

components/forecast/

Seven-day cards, daily chart, table, downloads and issue-time label

components/metrics/

Metric cards, lead-time plots, comparison tables and reference labels

components/flood/

Pending flood-risk panel

components/methodology/

Step cards and expandable technical explanations

hooks/

Location, forecast and evaluation queries

services/api.ts

API transport, response validation and error mapping

types/

Typed location, forecast, run metadata and evaluation contracts

utils/

Units, date formatting, CSV export and coordinate formatting

Location and selected lead day belong in the URL. Server responses belong in the query cache. Selecting a new location cancels or disregards obsolete requests so a slow response cannot overwrite the newly selected location.

The interface has explicit loading, empty, unavailable, stale, and error states. Keyboard users can select a location and read all results without relying on the map.

4. Proposed backend structure

Stack assumption: Python/FastAPI for the API, PyTorch for model inference, and xarray/NumPy for gridded data processing. Forecast arrays live in file or object storage; run metadata and spatial lookup can use PostgreSQL/PostGIS. Redis can cache frequently requested forecasts and support a job queue if required.

Path

Responsibility

backend/app/main.py

Application creation, route registration and middleware

backend/app/api/routes/locations.py

Name search, coordinate validation and supported-grid lookup

backend/app/api/routes/forecasts.py

Retrieve a location forecast from a versioned run

backend/app/api/routes/metrics.py

Serve precomputed evaluation results

backend/app/api/routes/datasets.py

Publish dataset metadata and audited coverage

backend/app/api/routes/health.py

Service liveness and readiness

backend/app/schemas/

Request and response validation

backend/app/services/geospatial.py

Coverage checks and grid-cell selection

backend/app/services/forecast_service.py

Resolve run, extract seven values, attach provenance

backend/app/services/model_registry.py

Checkpoint version, feature schema and normalization contract

backend/app/services/evaluation_service.py

Retrieve metrics for the requested region and lead time

backend/app/repositories/

Metadata database and forecast storage access

backend/app/workers/

Input preparation, scheduled inference and output publication

backend/app/core/

Configuration, logging, access controls and runtime settings

ml/data/

Source readers, date alignment, masks and sequence construction

ml/downscaling/

Stacked SRCNN, conservative baselines and conservation layer

ml/forecasting/

Seven-day forecasting architecture, losses and inference routines

ml/evaluation/

Baselines, temporal splits, continuous and event metrics

ml/configs/

Reproducible training and inference configurations

tests/

Data-contract, API, inference and user-flow checks

Forecast-serving flow

A scheduled job validates the latest eligible input data.

The forecasting model generates a seven-day spatial forecast for a declared issue time.

Output checks verify coordinates, valid intervals, finite values, coverage, and model version.

A complete forecast run is published atomically.

The dashboard requests a location within that run.

The API resolves the supported grid cell and returns its seven daily values and metadata.

Precomputing a forecast field lets map clicks retrieve results without training or running an India-wide model on every request. If no current run is available, the API returns its availability state rather than substituting a historical value.

Proposed API contract

Method and route

Purpose

GET /api/v1/locations/searchq=...

Return named-location candidates

GET /api/v1/locations/resolvelat=...&lon=...

Validate location and identify supported grid cell

GET /api/v1/forecast-runs/latest

Retrieve issue time, coverage, model version and status

GET /api/v1/forecastslat=...&lon=...&run_id=...

Return the seven-day point/grid forecast

GET /api/v1/forecast-runs/{run_id}/layers/{lead_day}

Return rainfall-layer metadata for the map

GET /api/v1/metricstask=...&region=...&lead_day=...

Return evaluation results with their scope

GET /api/v1/datasets

Return source provenance and audited availability

GET /api/v1/health/ready

Verify readiness to serve forecasts

Forecast responses include requested and grid coordinates, run ID, model version, issue timestamp, daily interval bounds, rainfall units, missing-data status, and any supported probabilities or intervals. The API must never mix outputs from different runs within one response.

5. Forecast methodology and leakage prevention

The proposed forecasting model consumes a window of past rainfall and selected auxiliary variables and predicts seven future daily rainfall fields. Static terrain and geography remain available for all forecast leads. Dynamic variables require issue-time availability checks.

If the architecture jointly predicts rainfall and other dynamic variables, those predicted states can feed later forecast steps. If it instead uses externally forecast atmospheric inputs, their source, issue time, and version must be documented. Actual future humidity, soil moisture, or cloud cover must never be supplied as if they were available at prediction time.

Normalization parameters, feature selection, and learned preprocessing are fitted on training data. Validation selects model settings; final testing measures performance on data not used for model choices. The 2021–2025 IMERG audit has already influenced the timing decision, so those dates must be disclosed as development evidence rather than described as a completely untouched final test.

Historical reanalysis inputs may arrive with a delay. An operational dashboard requires an explicit input-refresh strategy and evaluation that reflects those delays.

6. Testing and acceptance

Data: readable files, correct units, coordinates, accumulation windows, chronological ordering, missing-data masks and source versions.

Alignment: explicit IMD[d+1] mapping, leap-year and year-boundary handling, and direct reference-product timing checks.

Downscaling: nonnegative finite outputs, conservation residuals, baseline comparisons and external-product evaluation at a common spatial support.

Forecasting: metrics by lead day, region, season and rainfall threshold; comparisons with simple forecast baselines.

API: coordinate bounds, unsupported locations, unavailable runs, consistent units, invalid requests and response schemas.

Frontend: name search, coordinate selection, map clicks, synchronized lead-day changes, error states and mobile accessibility.

Deployment: reproducible model loading, versioned outputs, stale-run handling, logging and rollback to a known valid run.

Project targets such as correlation ≥0.80, NSE ≥0.60 and FAR ≤0.20 are acceptance goals tied to a specific reference, region, threshold and lead time. They are not claims of achieved performance.

7. Research files and experiment layout

The current Colab downscaling workflow uses stage1b_v2_temporally_aligned_conservative_srcnn_colab.py. Its output root is:

/content/drive/MyDrive/India_Rainfall_Native_1951_2025/derived/stage1b_v2_imdplus1_hybrid_conservative_005deg

Subdirectory

Contents

models/

Versioned training checkpoints, including latest_v2.pt and best_v2.pt

reports/

Training history and evaluation results

yearly/

Yearly downscaled rainfall estimates

The corrected pipeline first generates test-year outputs. Full historical generation follows evaluation. Missing source dates remain explicit. Generated estimates retain their native-source and model provenance.

8. Implementation and deployment configuration

### Environment Variables

| Variable | Default / Example | Purpose |
| :--- | :--- | :--- |
| `RAINFALL_SERVICE_URL` | `https://raincastmodels-1011762612859.europe-west1.run.app` | URL of the live Cloud Run RainNet CNN spatial microservice. |
| `INFERENCE_URL` | `https://btp-flood-detection-system-775429752478.europe-west1.run.app` | URL of the legacy/tabular inference microservice. |
| `PORT` | `10000` (Render) / `8080` (Docker) | Port for the FastAPI server to bind to. |
| `BUCKET` | `your-private-gcs-bucket` | Google Cloud Storage bucket for seed state persistence. |
| `BUNDLE_DIR` | `/app/bundle` | Path to `Weights.pt`, `Geometry.npz`, and `Historical_Seed.npz`. |

### Cloud Run Deployment (RainNet CNN)

Using Google Cloud Shell or Bash:
```bash
cd RainfallOnly_GCP_Bundle
export PROJECT_ID="project-6254dcef-f346-450e-8e4"
export BUCKET="your-gcs-bucket"
export REGION="europe-west1"
export ALLOW_UNAUTHENTICATED="true"
bash deploy.sh
```

Using Windows PowerShell:
```powershell
cd RainfallOnly_GCP_Bundle
.\deploy.ps1 -ProjectId "project-6254dcef-f346-450e-8e4" -Bucket "your-gcs-bucket" -Region "europe-west1" -AllowUnauthenticated
```

### Render Deployment (FastAPI Backend)

Deploy via the included `render.yaml` Blueprint or connect the GitHub repository with the root `Dockerfile`:
* **Runtime**: Docker (`Dockerfile`)
* **Port**: `10000`
* **Health Check**: `/`
* **Env Vars**: Set `RAINFALL_SERVICE_URL=https://raincastmodels-1011762612859.europe-west1.run.app`

### Local Multi-Container Stack (Docker Compose)

```bash
docker compose up --build -d
```
Spins up:
* `backend` on `http://localhost:8080`
* `rainfall_service` on `http://localhost:8081`
* `inference_service` on `http://localhost:8000`

### Automated Verification Script

Verify that health checks, model discovery, and 7-day prediction runs are operating smoothly:
```bash
# Test live Render backend
python test_render.py https://raincast-backend-fqrk.onrender.com

# Or test local instance
python test_render.py http://localhost:8080
```

