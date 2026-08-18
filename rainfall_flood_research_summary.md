# Rainfall Prediction & Flood-Risk Research — Comprehensive Summary

Compiled from your two uploaded documents and the 15 web sources you listed. For each source: **resolution** (spatial/temporal), **dataset type/format**, **study area**, **parameters/features used**, **methods**, **performance metrics**, **accuracy achieved**, and **why it matters**. Papers behind a paywall are marked; for those, only abstract-level detail was retrievable.

---

## PART 1 — Your Uploaded Documents

### 1. NEX-GDDP-CMIP6 Technical Note (NASA)
- **Dataset type:** Global downscaled climate projections (not a prediction *model* — a bias-corrected/downscaled *dataset*) derived from CMIP6 GCM runs under 4 SSP scenarios.
- **Spatial resolution:** 0.25° × 0.25° (~25 km), global land 60°S–90°N.
- **Temporal resolution/extent:** Daily, 1950-01-01 to 2100-12-31.
- **Variables (9):** relative humidity (hurs), specific humidity (huss), precipitation (pr), downwelling longwave (rlds) and shortwave (rsds) radiation, wind speed (sfcWind), mean/max/min air temperature (tas, tasmax, tasmin).
- **Format:** NetCDF, geographic projection, WGS-84 datum.
- **Method:** Bias correction (quantile-mapping style) + spatial disaggregation (BCSD-family) applied to raw CMIP6 GCM output, referenced against historical observational climatology.
- **Why it matters:** This is the most commonly cited *input dataset* for downstream rainfall/flood ML studies (used directly or as the ancestor of derivative products like INDRA-CMIP6 below). It solves the "GCMs are too coarse" problem but is itself superseded in resolution by newer regional products.

### 2. NITW M.Tech Dissertation — "Analysis of Multi-Source Uncertainties in Hydrological Modelling for Flood Predictions" (Badigunchala Prasanth, 2023)
- **Type:** Not a prediction model per se — an **uncertainty-quantification study** comparing three hydrological models.
- **Models:** HEC-HMS (lumped), HEC-HMS (semi-distributed), GR4J (lumped).
- **Input data:** India Meteorological Department (IMD) gridded rainfall data **and** gauge-station rainfall data (two parallel input datasets).
- **Uncertainty sources analyzed:** input data, model structure, and parameter uncertainty — individually and in combination.
- **Method for combining uncertainty:** ensembles across model/input/parameter combinations; final synthesis via **Bayesian Model Averaging (BMA)**.
- **Key findings (performance-relevant):**
  - HEC-HMS lumped is most sensitive to input-data choice (widest prediction intervals under input uncertainty alone).
  - Gridded-rainfall ensembles are more reliable but less precise than gauge-based ensembles under model-structure uncertainty.
  - Semi-distributed HEC-HMS has the highest parameter uncertainty (because it resolves spatial variability); lumped models are less parameter-sensitive.
  - Combining all 3 models gives the most *reliable* (but least *precise*) results; BMA improved both reliability and accuracy over any single model or naïve ensemble.
- **Metrics used:** prediction intervals, reliability, and precision (not classic NSE/RMSE reporting in the abstract).
- **Why it matters:** This is a methodological/diagnostic study rather than an accuracy benchmark — its value is in showing *which* uncertainty source dominates under which model structure/data combination, directly relevant to interpreting the accuracy claims of every ML paper below (their reported skill is always conditional on similar hidden uncertainties).

---

## PART 2 — Rainfall Prediction Papers (ML/DL)

### 3. Khan & Maity (2020) — "Hybrid Deep Learning Approach for Multi-Step-Ahead Daily Rainfall Prediction Using GCM Simulations," *IEEE Access* 8, 52774–52784
- **Model:** Hybrid Conv1D–MLP (1-D CNN + Multi-Layer Perceptron).
- **Forecast horizon:** Multi-step-ahead, 1–5 days.
- **Inputs:** 9 GCM-simulated meteorological variables (not observed data — because GCM variable simulation is more reliable than GCM rainfall estimate itself, and observed records are sparse).
- **Data source:** General Circulation Model (GCM) output (India-focused hydroclimate work by this group).
- **Why it matters:** Foundational paper establishing that hybrid CNN+dense architectures on GCM-simulated (not raw observed) predictors improve multi-day-ahead rainfall skill — heavily cited by nearly every later rainfall-DL paper in this list.

### 4. Bhimavarapu (2022) — "IRF-LSTM: Enhanced Regularization Function in LSTM to Predict the Rainfall," *Neural Computing and Applications* 34, 20165–20177
- **Model:** LSTM with a novel **Improved Regularization Function (IRF)** to combat overfitting from deep nonlinear hidden layers.
- **Context/driver variable:** Sea-surface temperature (ENSO-linked) as a rainfall precursor.
- **Metrics:** RMSE, MAE, NSE (Nash–Sutcliffe Efficiency), r (correlation coefficient).
- **Result:** IRF-LSTM reported to outperform other state-of-the-art rainfall models on all four metrics (full comparison table paywalled).
- **Why it matters:** Direct methodological cousin of the ILF-LSTM (sea-surface temperature) model by the same author — regularization-focused rather than architecture-focused improvement.

### 5. "Short-term rainfall forecasting using machine learning-based approaches of PSO-SVR, LSTM and CNN" (ScienceDirect, S0022169422010332)
- **Models compared:** PSO-optimized Support Vector Regression (PSO-SVR), LSTM, CNN.
- **Forecast horizon:** 5-minute and 15-minute ahead (very short-term/nowcasting scale — much finer temporal resolution than the daily-scale papers above).
- **Study area:** Niavaran station, Tehran, Iran.
- **Method detail:** Rainfall events first classified into 4 severity/duration classes using **K-Nearest-Neighbor (KNN)**; a separate forecast model trained per class.
- **Result:** Event classification + additional predictors improved accuracy over a single undifferentiated model.
- **Why it matters:** Rare example operating at sub-hourly resolution — most other papers here are daily-scale; shows classification-then-regression beats one-size-fits-all regression for rainfall.

### 6. IRF/Intensified-LSTM family & related rainfall-DL literature (background, cited across the set)
Multiple related architectures surfaced repeatedly in citation networks around your links (Intensified LSTM with weighted linear units, AD-PSO-Guided WOA-LSTM, CNN-XGBoost hybrids, ConvLSTM with explainable AI for Indian cities). Common pattern across this literature:
- **Typical inputs:** rainfall, temperature, humidity, wind speed (station/gridded).
- **Typical metrics:** RMSE, MAE, NSE, R²/r, sometimes accuracy/precision/recall if framed as rain/no-rain classification.
- **Typical result:** LSTM-family models outperform classical ML (KNN, logistic regression, plain SVM) and vanilla ANN on sequential rainfall data, with hybridization (CNN+LSTM, attention, regularization tweaks) providing incremental (not transformative) gains.

---

## PART 3 — Flood Susceptibility / Flood-Risk Mapping Papers (ML)

### 7. Taromideh, Fazloula, Choubin, Emadi & Berndtsson (2022) — "Urban Flood-Risk Assessment: Integration of Decision-Making and Machine Learning," *Sustainability* 14(8), 4483 (MDPI, open access)
- **Study area:** Rasht, Gilan Province, Iran (~95 km², elevation 14–255 m, Mediterranean climate, 1337 mm/yr avg. precipitation).
- **Data:** 93 flooded points (2009–2020, regional water company + field survey) + 93 randomly chosen non-flooded points.
- **Hazard-conditioning parameters (11):** elevation, slope angle, aspect, rainfall, distance to rivers, distance to streets, soil hydrological group, curve number, distance to urban drainage, urban drainage density, land use.
- **Elevation/slope resolution:** DEM pixel size **12 m × 12 m**.
- **Rainfall data:** 15 precipitation stations (2000–2019), interpolated via Inverse Distance Weighting (IDW); annual precipitation 1227–1263 mm/yr.
- **Models compared:** CART, Random Forest (RF), Boosted Regression Trees (BRT), Multivariate Adaptive Regression Splines (MARS), Multivariate Discriminant Analysis (MDA), Support Vector Machine (SVM).
- **Train/test split:** 70% / 30%.
- **Vulnerability side (separate from hazard):** 6 factors (population density, dwelling quality, household income, distance to cultural heritage, distance to medical centers, land use) weighted via Analytic Hierarchy Process (AHP) with 40 expert respondents; pixel size 12 m.
- **Metrics:** Accuracy, Probability of Detection (POD), False Alarm Ratio (FAR), Precision, AUC-ROC.
- **Results (best → worst model):**
  | Model | Accuracy | POD | FAR | Precision | AUC |
  |---|---|---|---|---|---|
  | **CART (best)** | 0.892 | 0.867 | 0.071 | 0.929 | 0.947 |
  | RF | 0.875 | 0.839 | 0.071 | 0.928 | 0.941 |
  | BRT | 0.857 | 0.827 | 0.111 | 0.889 | 0.921 |
  | MARS | 0.821 | 0.801 | 0.133 | 0.867 | 0.916 |
  | MDA | 0.811 | 0.788 | 0.143 | 0.857 | 0.889 |
  | SVM (worst) | 0.768 | 0.759 | 0.214 | 0.786 | 0.781 |
- **Most important hazard factors:** distance to rivers >> urban drainage density > distance to urban drainage.
- **Most important vulnerability factors (AHP weights):** population density (0.363), land use (0.279), dwelling quality (0.158), household income (0.087), distance to cultural heritage (0.064), distance to medical centers (0.049).
- **Why it matters:** A clean, fully open-access template for combining objective hazard ML with subjective AHP vulnerability scoring — useful methodologically even though the 2019 flood event driving it (peak flows 132–169 m³/s) is small-scale/regional.

### 8. Qin, Wang, Meng, Long, Zhang & Shi (2025) — "Enhancing urban resilience through machine learning-supported flood risk assessment," *npj Urban Sustainability* 5, 19 (open access)
- **Study area:** Guangzhou, China (11 districts, ~7,434 km² land area, >15M population, subtropical monsoon, 1673–2005 mm/yr rain, ~80% Apr–Sep).
- **Data:** 479 cleaned flood records (2015–2023-ish, Guangzhou Emergency Management Bureau, geocoded); non-flood points chosen via a **3/4-quantile buffer-distance method** (novel contribution) rather than random sampling.
- **Flood susceptibility model:** Random Forest, 15 hydrological/topographic/anthropogenic features (SPI, precipitation, distance to rivers, hydrological soil groups, elevation, slope, TWI, convergence/plan/profile curvature, distance to roads, distance to culverts, LULC, NDVI, NDBI). Grid resolution: **100 m × 100 m**.
- **RF hyperparameters:** 75 trees, max depth 10, min_samples_split 5, min_samples_leaf 3, max_features=sqrt (via GridSearchCV + 5-fold CV).
- **Building-function model:** CatBoost using POI/AOI kernel-density, building geometry, and building-surroundings features (22 features, PCA-reduced to 15 components explaining >80% variance); ADASYN used for class imbalance.
- **Building count:** 1,790,141 buildings (from a global building-footprint dataset, ~84.5% recall / 81.1% precision on the source dataset).
- **Vulnerability grading:** adapted from UK National Planning Policy Framework (residential = moderate; commercial/industrial/cultural = low; healthcare/education/public-service = high).
- **Metrics/results:**
  - Flood-susceptibility RF: test AUC **0.9494**, test accuracy **0.9132**, training accuracy 0.9627, 5-fold CV mean accuracy 0.9149.
  - Building-function CatBoost: overall accuracy **0.8561** (commercial 0.833, residential 0.860, industrial 0.845, educational 0.846); training accuracy 0.9320, 5-fold CV mean 0.9239.
  - 3/4-quantile non-flood sampling method significantly outperformed naive random sampling (ablation shown in paper).
- **Key spatial finding:** 61.45% of Guangzhou at "very low" susceptibility; only 8.5%+8.5% at "high"/"very high," concentrated in central Liwan/Yuexiu/Tianhe/Haizhu/Baiyun. >60% of buildings moderate vulnerability (residential); <1% high vulnerability.
- **Why it matters:** Introduced the 3/4-quantile non-flooded-point sampling method that a later paper (Yancheng, below) directly builds on and re-validates.

### 9. Zhang & Guo (2026) — "Interpretable machine learning framework for urban flood susceptibility assessment... in Yancheng," *Scientific Reports* 16, 21315 (open access)
- **Study area:** Yancheng, Jiangsu Province, China — 16,931 km², largest prefecture-level city in Jiangsu; 5 distinct geomorphic units (coastal tidal flat, Lixiahe lowland, Yellow River paleo-channel, urban built-up, general agricultural); avg. elevation 2–4 m; 1000–1100 mm/yr rain (60% Jun–Sep).
- **Data:** 486 flood points (2015–2023, Emergency Management Bureau + news + Sina Weibo social media, cross-verified/deduplicated). Non-flood points via the **3/4-quantile-distance method** (buffer ≈ 2.3 km), 1:1 ratio → 972 total samples.
- **Resolution:** All rasters resampled to **30 m × 30 m** (bilinear for continuous, majority for categorical LULC from ESA WorldCover native 10 m).
- **10 conditioning factors (4 dimensions):** topography (elevation, slope, TWI, flow accumulation), hydrology (distance to rivers, river network density), land use (impervious-surface ratio, NDVI), meteorology (mean annual precipitation), + TWI formula given (α/tanβ).
- **Multicollinearity check:** VIF 1.23–4.67 (all <5), max Pearson r = 0.72 (TWI vs. flow accumulation) — no serious collinearity.
- **Models compared:** Random Forest, XGBoost, SVM (RBF kernel); GridSearchCV + 5-fold CV; 70/30 stratified split (680/292 of 972 samples), fixed seed 42.
- **Interpretability:** SHAP (TreeSHAP) — global importance, dependence plots, spatial attribution via IDW interpolation of point-wise SHAP values (power p=2, 12 nearest neighbors).
- **Results:**
  | Model | Test AUC | Accuracy | Precision | Recall | F1 | Kappa |
  |---|---|---|---|---|---|---|
  | **XGBoost (best)** | **0.938** | 0.891 | 0.885 | 0.897 | 0.891 | 0.782 |
  | RF | 0.912 | 0.867 | – | – | – | 0.734 |
  | SVM | 0.876 | 0.823 | – | – | – | 0.646 |
- **5-fold CV AUC (mean, 95% CI, SD):** XGBoost 0.938 [0.927–0.949], SD 0.009; RF 0.911 [0.898–0.924], SD 0.010; SVM 0.875 [0.853–0.897], SD 0.018.
- **DeLong test:** XGBoost vs RF significant (p=0.023); XGBoost vs SVM highly significant (p<0.001).
- **Robustness checks:** train/test split sensitivity (6:4/7:3/8:2 → AUC 0.931/0.938/0.942); +5% Gaussian noise → AUC drop only 0.8–1.5 pts; bootstrap (n=1000) 95% CI [0.929, 0.947]; spatial holdout (Dongtai City withheld) → AUC 0.921 vs 0.938 (0.017-pt gap, indicating mild spatial-autocorrelation optimism in the random-split number); coordinate-perturbation (±90 m) → AUC 0.935.
- **SHAP global ranking:** TWI (mean |SHAP| 0.185, 18.47% contribution) > elevation (0.142, 16.23%) > impervious-surface ratio (0.098) > distance to rivers > river network density > flow accumulation > NDVI. Top-3 factors cumulative contribution **47.6%**.
- **Nonlinear thresholds found:** elevation risk rises sharply below 10 m and plateaus above 20 m; impervious surface >~60% triggers a sharp risk jump; distance-to-river risk decays exponentially (τ=1.8 km, high-risk buffer 0–1.5 km, stabilizes beyond 5 km).
- **Spatial heterogeneity by geomorphic unit (% area at high/very-high risk):** Urban built-up 31.5% (dominated by impervious surface, mean SHAP 0.267) > Lixiahe lowland 28.6% (dominated by TWI, Kruskal-Wallis H=67.34, p<0.001) > coastal tidal flat 23.1% (dominated by elevation) > general agricultural 14.3% > Yellow River paleo-channel 11.2% (lowest risk).
- **City-wide susceptibility:** 55.9% very-low/low, 25.0% medium, **19.2% high/very-high** (3,246 km²). By district: Tinghu 37.0% (highest) > Jianhu 30.5% > Yandu 28.2% ... Dongtai 9.7% (lowest). Classification-method sensitivity: Jenks 19.2%, equal-interval 21.8%, quantile 20.0% (spatial *ranking* robust across methods; absolute area estimates are method-dependent).
- **Why it matters:** The most methodologically rigorous flood-susceptibility paper in your list — extensive ablations, explicit spatial-autocorrelation and robustness testing, and honest acknowledgment that the static model can't capture dynamic coastal/tidal/storm-surge processes. A strong template if your own work needs a defensible ML flood-susceptibility pipeline.

---

## PART 4 — Global / Regional Streamflow & Hydro-Climate Datasets and Forecast Models

### 10. Mandal, Sardana, Raghuvanshi & Agarwal (2026) — "INDRA-CMIP6: Indian subcontinent high resolution Downscaled pRecipitation and Air temperature data from CMIP6," *Scientific Data* 13, 1038 (open access)
- **Type:** A **dataset paper** (Data Descriptor), not a prediction model.
- **Spatial resolution:** **0.1° × 0.1°** (≈10 km) — 2.5× finer than NEX-GDDP-CMIP6's 0.25° and finer than most global downscaled products.
- **Domain:** Indian subcontinent + Bangladesh, Nepal, Bhutan, parts of Tibet/Myanmar (65.5°E–100°E, 5°N–40°N).
- **Temporal coverage:** Historical 1950–2014 (calibrated 1979–2000, validated 2001–2014) + future projections 2015–2100.
- **Scenarios:** SSP126, SSP245, SSP370, SSP585 (IPCC AR6).
- **Source GCMs:** 14 CMIP6 GCMs + multi-model ensemble (MME) mean, r1i1p1f1 realization.
- **Reference/observation datasets used for bias correction:** MSWEP (precipitation) and MSWX (Tmax/Tmin), both native 0.1° resolution.
- **Method:** **Double Bias-Corrected Constructed Analogue (DBCCA)** — extends BCCA with a second round of bias correction to fix drizzle-effect and residual-bias problems; 4 steps (coarse-grid bias correction via quantile mapping → 91-day-window constructed-analogue library with ridge-regression weights → downscale to fine grid using same weights → second daily-scale quantile-mapping correction). Future bias correction uses Detrended QM.
- **Validation metrics:** Mean Absolute Error (MAE), mean bias.
- **Results:** Downscaled MME reduces MAE to **0.24 mm/day** (precipitation), **0.20 °C** (Tmax), **0.16 °C** (Tmin) — down from raw-GCM MAEs of 0.38 mm/day, 0.76 °C, 1.47 °C respectively. Raw GCMs show a systematic dry bias (>3 mm/day) over the Bay of Bengal/most of India (linked to a ~10° southward ITCZ displacement vs. observed ~22°N); a warm Tmax / cold Tmin bias pattern over most of India and northern Pakistan; strong cold bias over the Himalaya for both temperature variables. DBCCA substantially reduces bias/MAE everywhere, especially over complex terrain (Western Ghats, Himalayan foothills, Tibetan Plateau).
- **File sizes / access:** ~53.7 GB per variable for the MME archive (Zenodo, ~161 GB total); ~2.4 TB for all 14 individual GCMs (Google Drive). Code on GitHub.
- **Why it matters:** If your work needs India-specific high-resolution climate-change-era rainfall/temperature inputs for hydrological or flood modeling, this is currently the finest-resolution open CMIP6-derived product for the region (finer than the widely-used Mishra et al. 2020 0.25° South Asia product it explicitly supersedes).

### 11. Taccari, Tazi, Morrison et al. (2026) — "AIFL: A Global Daily Streamflow Forecasting Model Using a Deterministic LSTM Pre-trained on ERA5-Land and Fine-tuned on IFS" (ECMWF; arXiv 2602.16579, EGU26-13650)
- **Model:** Deterministic LSTM, two-stage transfer learning.
- **Training data:** 18,588 basins curated from the **CARAVAN** global dataset.
- **Stage 1 (pre-training):** 40 years of **ERA5-Land reanalysis** (1980–2019) — learns general hydrological process representations.
- **Stage 2 (fine-tuning):** Operational **Integrated Forecasting System (IFS)** control forecasts (2016–2019) — adapts to the bias/error structure of real operational NWP output, explicitly targeting the "reanalysis-to-forecast domain shift" problem that degrades most data-driven streamflow models when moved from training-on-reanalysis to live forecasting.
- **Temporal resolution:** Daily streamflow, global.
- **Test period:** Independent 2021–2024.
- **Metrics/results:** Median modified Kling–Gupta Efficiency (**KGE′) = 0.66**; median **Nash–Sutcliffe Efficiency (NSE) = 0.53**. Particular strength noted in identifying **extreme/peak-flow events** — directly relevant to flood early-warning.
- **Institutional context:** Built for eventual integration into ECMWF's real-time global flood-forecasting workflow; positioned as an "independent, transparent, reproducible baseline" within the CARAVAN ecosystem.
- **Why it matters:** This is the most operationally-oriented paper in your list — a genuine global, near-real-time daily streamflow forecast model (not just a susceptibility map), and the two-stage reanalysis→forecast transfer-learning trick is a reusable idea for any of your own forecasting work that trains on reanalysis but must deploy on live forecast products.

---

## PART 5 — Global Precipitation Forecasting / Downscaling (Deep Learning, npj Climate & Atmospheric Science)

### 12. Noh & Ahn (2026) — "Deep learning with spatio-temporal conditioning improves global subseasonal precipitation forecasts," *npj Clim Atmos Sci* 9, 156 (open access)
- **Model name:** **ReST** (ResU-Net with Spatio-Temporal adaptive Modulation) — U-Net backbone + Spatially Adaptive Denormalization (SPADE, geographic conditioning) + Feature-wise Linear Modulation (FiLM, seasonal/temporal conditioning); 5 residual blocks (Res3D-style), 2.39M parameters (vs. 34.58M for the Res34-Unet baseline).
- **Forecast target:** Subseasonal precipitation, **Weeks 1–5**, global land, **0.25°** spatial resolution.
- **Training data (predictors):** 20 years (2000–2019) of **GEFSv12** reforecasts; dynamic predictors = weekly precip accumulation, 2 m temperature, total column water vapor, geopotential height at 500 hPa (ensemble-mean of 11 members); static geographic predictors = DEM (ETOPO 2022), IPCC AR6 climate-region classification, ERA5 land-sea mask, lat/lon.
- **Observations (target):** **63,588 stations** globally (GHCN-Daily + GSOD, gap-filled via SC-Earth), interpolated to 0.25° weekly totals.
- **Train/val/test split:** Train 2000–2013, validation 2014–2015, test 2016–2019.
- **Baselines compared:** raw GEFSv12 (RAW), quantile mapping (QM), random forest (RF), Res34-Unet deep-learning baseline.
- **Metrics:** Anomaly Correlation Coefficient (ACC), Mean Squared Error Skill Score (MSESS), RMSE.
- **Results:** ReST consistently best across all metrics/lead times, largest gains in **Weeks 1–2**; QM/RF only marginally beat RAW; skill decreases rapidly beyond Week 2 for all methods (a hard predictability ceiling, not a model-quality issue) — practical improvement horizon ≈ **2 weeks**. Ablations: broader SPADE (spatial) coverage matters far more than FiLM (temporal) placement; removing total-column-water-vapor or DEM predictors causes the largest skill loss (moisture removal hurts tropics/convective regions; DEM removal hurts Andes/Himalaya).
- **Why it matters:** Demonstrates that *where* you inject geographic/topographic context inside a network architecture matters more than adding more temporal/seasonal signal — a useful architecture-design lesson for any spatial rainfall-DL model.

### 13. Tang, Shen, Fu et al. (2026) — "Bias-targeted deep learning enhances short-range heavy rainfall forecasts," *npj Clim Atmos Sci* 9, 78
- **Key insight:** NWP-vs-observation biases for heavy rainfall events follow an approximately **Gaussian distribution** — so instead of predicting rainfall directly (non-negative, heavy-tailed, hard for standard losses), the model predicts the **bias** as the training target.
- **Model:** Multi-task U-Net.
- **Region:** China (multi-region validation).
- **Metric:** Threat Score (TS) — a standard categorical rainfall-forecast verification metric.
- **Result:** TS improvements **exceeding 21%** in 4 of 5 evaluated Chinese regions, described as stable and substantial short-range heavy-rainfall forecast enhancement.
- **Why it matters:** A simple, elegant reframing (predict-the-bias instead of predict-the-value) that sidesteps the loss-function problems non-negative/heavy-tailed rainfall usually causes for deep nets — directly transferable idea.

### 14. Glawion, Polz, Kunstmann, Fersch & Chwala (2025) — "Global spatio-temporal ERA5 precipitation downscaling to km and sub-hourly scale using generative AI," *npj Clim Atmos Sci* 8, 219 (open access)
- **Model:** **spateGAN-ERA5** — conditional GAN (cGAN), 3D-convolutional residual blocks (Res3D), U-Net-like down/up-sampling with skip connections, dropout-based probabilistic ensembling.
- **Downscaling factor:** ERA5 input **24 km, 1 h** → output **2 km, 10 min** (12× spatial, 6× temporal super-resolution).
- **Training target/reference:** RADKLIM-YW — German gauge-adjusted, climatology-corrected weather-radar composite (16 C-band radars, ~1 gauge per 330 km², 2009–2020).
- **Generalization test regions (not trained on):** USA (MRMS radar, non-gauge-adjusted, Jul–Dec 2021) and Australia (operational radar network, gauge-adjusted, Jul–Dec 2021 + Jan–Mar 2021 tropical subset).
- **Compute:** Trains on 4× A100 80GB GPUs (~3–4 days); inference ~0.04 s per patch on a single V100/A100 (10 GB VRAM sufficient) — deliberately kept lightweight for broad usability.
- **Metrics:** Fractions Skill Score (FSS)/ensemble FSS, RMSE, Continuous Ranked Probability Score (CRPS)/MAE, radially averaged power spectral density (RAPSD), rank histograms, linear eccentricity (spatial anisotropy).
- **Results:** For rain-rate thresholds >5 mm/h, spateGAN-ERA5 is "the only model with acceptable skill" versus simple ERA5 interpolation and the rainFARM stochastic baseline. Highest relative improvement (ΔmFSS) in Australia (where baseline interpolation skill was lowest); best absolute skill in the tropical dataset — indicating **strong generalization outside the training domain**, including to tropical/convective regimes fundamentally different from mid-latitude Germany. Reproduces realistic extreme-value distributions (lognormal), spatial power spectra, and spatial anisotropy that plain ERA5 interpolation and rainFARM cannot.
- **Why it matters:** The clearest demonstration in your set that a model trained on one region's high-quality radar climatology can generalize globally — directly useful if flood-risk work in a data-poor region needs plausible high-resolution rainfall fields derived only from ERA5.

### 15. Khosravi, Ouarda & Homayouni (2025) — "Developing an ensemble machine learning framework for enhanced climate projections using CMIP6 data in the Middle East," *npj Clim Atmos Sci* 8, 174 (open access)
- **Model:** **Stacking-EML** — two-level stacked ensemble. Level 1 (base learners): Random Forest, XGBoost, LightGBM, SVM, CatBoost. Level 2 (meta-learner, best of 3 tried): Artificial Neural Network (beat Multiple Linear Regression and LASSO).
- **Targets:** Max temperature, min temperature, precipitation.
- **Source data:** 3 CMIP6 GCMs (AWI-CM-1-1-MR, MIROC6, MRI-ESM2-0), monthly, 2015–2100, under SSP1-2.6/SSP2-4.5/SSP5-8.5; bias-corrected against ERA5 (1995–2014 baseline).
- **Downscaling:** Raw GCM (native ~1.1°–1.4°) → resampled to **0.5° × 0.5°** via **co-Kriging** (using DEM elevation/slope/aspect as secondary variables) → two-step bias correction (linear scaling + quantile mapping).
- **Region:** 16 Middle-East countries, >69 million km².
- **Metrics:** RMSE, R², MAE, NSE, MBE (mean bias error); Taylor diagrams for model-skill comparison.
- **Results:** Individual base learners — **LightGBM and Random Forest** consistently best (lowest RMSE, highest R², favorable MAE/NSE/near-zero MBE); SVM/XGBoost/CatBoost weaker, CatBoost worst. Final **Stacking-EML with ANN meta-learner** achieved correlation coefficients of **R² = 0.99 (Tmax), 0.98 (Tmin), 0.82 (precipitation)** — clearly outperforming raw CMIP6 GCM output (e.g., MIROC6 showed much higher standard deviation and lower correlation on the Taylor diagram). Local R² for precipitation ranged widely (0.23–0.98) — best in wetter northern regions (Turkey, NW Iran), worst in arid central/southern Arabian Peninsula.
- **Projected impacts (SSP5-8.5, by 2099):** Summer max temperatures in southern regions (Saudi Arabia, Oman, Yemen, Iran) exceeding **45 °C**; substantial precipitation reduction/drought intensification in the south; **increased** precipitation and flood risk projected for Turkey and northern Iran (Caspian coast, Zagros Mountains).
- **Why it matters:** A strong illustration that stacking-ensemble ML on top of CMIP6 GCM output meaningfully outperforms raw multi-model-ensemble GCM skill for regional climate projection — and gives you concrete SSP-scenario flood/drought hotspot maps for the Middle East specifically.

---

## Cross-Cutting Comparison Table

| Paper | Domain | Spatial res. | Temporal res./horizon | Best model | Headline metric(s) |
|---|---|---|---|---|---|
| NEX-GDDP-CMIP6 | Global downscaled climate (dataset) | 0.25° | Daily, 1950–2100 | — (bias-correction pipeline) | n/a (input dataset) |
| INDRA-CMIP6 | India regional downscaled climate (dataset) | 0.1° | Daily, 1950–2100 | DBCCA | MAE 0.24 mm/day (pr), 0.20/0.16 °C (Tmax/Tmin) |
| Khan & Maity 2020 | Daily rainfall, GCM-driven | station/basin | 1–5 day | Conv1D-MLP hybrid | (metrics in full text; foundational architecture) |
| IRF-LSTM 2022 | Rainfall (SST-linked) | station | not stated | LSTM+IRF | RMSE/MAE/NSE/r "best" (values not open) |
| PSO-SVR/LSTM/CNN (Tehran) | Nowcast rainfall | station | 5–15 min | Classified PSO-SVR | Improved accuracy via KNN pre-classification |
| Taromideh et al. 2022 (Rasht) | Urban flood hazard | 12 m DEM | event-based | CART | Accuracy 0.892, AUC 0.947 |
| Qin et al. 2025 (Guangzhou) | Urban flood risk + building vulnerability | 100 m grid | event-based | RF (hazard) + CatBoost (buildings) | AUC 0.9494 / Acc. 0.8561 |
| Zhang & Guo 2026 (Yancheng) | Urban flood susceptibility, SHAP | 30 m grid | event-based | XGBoost | AUC 0.938, Acc. 0.891 |
| AIFL (ECMWF) | Global streamflow forecast | 18,588 basins | Daily | LSTM (2-stage transfer) | KGE′ 0.66, NSE 0.53 |
| ReST | Global subseasonal precip. forecast | 0.25° | Weeks 1–5 | U-Net + SPADE/FiLM | ACC/MSESS best Weeks 1–2 |
| Bias-targeted U-Net | Short-range heavy rainfall, China | station/regional | short-range | Multi-task U-Net | TS +21% (4/5 regions) |
| spateGAN-ERA5 | Global precip. downscaling | 2 km / 10 min (from 24 km/1h) | sub-hourly | cGAN | Best FSS for >5 mm/h; strong out-of-domain generalization |
| Stacking-EML | Regional CMIP6 climate projection, Middle East | 0.5° (co-Kriging) | Monthly, 2015–2100 | Stacking (ANN meta) | R² 0.99 (Tmax), 0.98 (Tmin), 0.82 (pr) |

---

## What this tells you overall

1. **Resolution has been improving fast and unevenly.** Global downscaled climate datasets moved from 0.25° (NEX-GDDP-CMIP6, 2022) to 0.1° (INDRA-CMIP6, 2026) for India specifically; precipitation *forecast/downscaling* work (spateGAN-ERA5) has pushed to 2 km / 10-min, but only validated in 3 countries so far.
2. **Metrics differ by task type**, not by discipline preference: classification-style flood-susceptibility papers use Accuracy/AUC/Precision/Recall/F1/Kappa/POD/FAR; continuous rainfall/streamflow-forecast papers use RMSE/MAE/NSE/KGE/ACC/MSESS/R²; probabilistic downscaling papers add CRPS/FSS/rank histograms.
3. **XGBoost/Random Forest/LightGBM dominate structured tabular flood-susceptibility and stacking-ensemble climate work** (Yancheng, Guangzhou, Middle East papers), while **LSTM/CNN/U-Net/GAN architectures dominate sequential or spatial rainfall time-series and downscaling** (Khan & Maity, IRF-LSTM, ReST, spateGAN, AIFL).
4. **Reported accuracy is almost always conditional on hidden uncertainty** exactly as your uploaded NITW dissertation demonstrates — input-data choice (gridded vs. gauge), model structure, and non-flooded-point-sampling strategy (see the 3/4-quantile method in papers 8–9) can shift AUC by several points, which is larger than the gap between competing ML algorithms in several of these papers.
5. **Most impactful/most-cited paper here:** Khan & Maity (2020) — cited by nearly every later rainfall-DL paper as the origin of the "hybrid DL + GCM-simulated predictors" approach. **Most operationally significant:** AIFL (ECMWF-built, designed for real-time global deployment). **Most rigorous/transparent methodology:** the Yancheng XGBoost/SHAP paper (extensive ablations and honest limitation reporting).
