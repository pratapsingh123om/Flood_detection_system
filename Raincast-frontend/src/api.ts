export interface SoilMoistureStrata {
  depth_5m_pct: number;
  depth_10m_pct: number;
  depth_20m_pct: number;
}

export interface ClimateAtmosphericTensor {
  tmax_degC: number;              // 1. Tmax (°C)
  tmin_degC: number;              // 1. Tmin (°C)
  dewpoint_degC: number;          // 2. Dew-point temperature (°C)
  humidity_pct: number;           // 3. Relative humidity (%)
  sw_radiation_wm2: number;       // 4. Shortwave radiation (W/m^2)
  lw_radiation_wm2: number;       // 5. Longwave radiation (W/m^2)
  wind_speed_ms: number;          // 6. Wind speed: sqrt(U^2 + V^2) (m/s)
  wind_u_ms: number;              // 7. Wind U vector component (m/s)
  wind_v_ms: number;              // 7. Wind V vector component (m/s)
  surface_pressure_hpa: number;   // 8. Sea-level / Surface pressure (hPa)
  geopotential_height_m: number;  // 9. Geopotential height 500hPa (gpm)
}

export interface WardFloodRisk {
  ward_id: number;
  ward_name: string;
  latitude: number;
  longitude: number;
  elevation_m: number;
  drainage_capacity_mm: number;
  predicted_rain_mm: number;
  runoff_mm: number;
  water_depth_cm: number;
  risk_level: 'HIGH' | 'MODERATE' | 'LOW';
  color_hex: string;

  // IPCC Disaster Risk Components
  hazard_score: number;         // H = R (SCS-CN) x Wet Days (W) x Slope (S) (0-100)
  vulnerability_score: number;  // V = D x NDVI x NDWI x E x TPI (0-100)
  exposure_score: number;       // E = Population Density (0-100)
  ipcc_risk_score: number;      // Composite Risk: 0.80H + 0.15V + 0.05E (0-100)

  // Physical & Environmental Parameters
  dist_to_water_m: number;      // Euclidean distance to nearest water body (m)
  tpi_value: number;            // Topographic Position Index
  tpi_category: string;         // 'Valley / Low Sink', 'Flat Plain / Mid-slope', 'Ridge / High Ground'
  ndvi: number;                 // Normalized Difference Vegetation Index
  ndwi: number;                 // Normalized Difference Water Index
  slope_pct: number;            // Terrain slope percentage (%)
  wet_days_count: number;       // Consecutive wet precipitation days
  population_density: number;   // Persons per km^2
  soil_moisture: SoilMoistureStrata; // Multi-depth soil moisture (5m, 10m, 20m)
  lulc_category: string;        // Land Use / Land Cover category
}

export interface ForecastDay {
  day?: string;
  date?: string;
  temp: number;
  rain: number;
  icon: string;
  intensity: number;
  wind_speed?: number;
  humidity?: number;
  is_fallback?: boolean;
  climate_tensor?: ClimateAtmosphericTensor;
}

export interface Metric {
  label: string;
  val: string;
  sub: string;
  color: string;
}

export interface RiskArea {
  name: string;
  district: string;
  score: number;
  pop: string;
}

export interface TestDataPoint {
  date: string;
  actual: number;
  predicted: number;
  default_cmip?: number;
  threshold?: number;
  climate_tensor?: ClimateAtmosphericTensor;
}

export interface HydrologicalMetrics {
  rmse: number;
  mae: number;
  r2_score: number;
  matching_pct: number;
  csi: number;
  pod: number;
  far: number;
  nse: number;
}

export interface IPCCFrameworkSummary {
  hazard_mean: number;
  vulnerability_mean: number;
  exposure_mean: number;
  ipcc_risk_composite: number;
  ahp_weights: {
    hazard: number;
    vulnerability: number;
    exposure: number;
  };
  high_risk_wards_count: number;
  moderate_risk_wards_count: number;
  low_risk_wards_count: number;
  total_population_at_risk: string;
}

export interface PredictionPayload {
  model: string;
  location: string;
  ward_id?: number;
  timeframe?: string;
  baseline_model?: string;
  runoff: number;
  elevation: number;
  drainage: number;
  persona?: 'hydrologist' | 'planner';
}

export interface PredictionResponse {
  test_data: TestDataPoint[];
  weather_forecast: ForecastDay[];
  metrics: Metric[];
  risk_areas: RiskArea[];
  ward_risks?: WardFloodRisk[];
  hydro_summary?: HydrologicalMetrics;
  ipcc_summary?: IPCCFrameworkSummary;
  cmip6_comparison?: Record<string, any>;
}

export interface ModelInfo {
  id: string;
  name: string;
}

export const DEFAULT_MODELS: ModelInfo[] = [
  { id: "unet_lstm_bias", name: "1. Hybrid U-Net + LSTM (75-Year ERA5 Pipeline · Cloud Run · Top CMIP Match: 22.4%)" },
  { id: "unet_rf_bias", name: "2. Hybrid U-Net + XGBoost (GCP Cloud Run · Top Accuracy · r=0.760 · RMSE: 7.22mm)" },
  { id: "randomforest_model", name: "3. Physics Random Forest (Top CSI: 0.615 · POD: 72.7% · Low FAR: 20%)" },
  { id: "residual_unet_model", name: "4. Deep Spatial Residual U-Net (64×64 Atmospheric Grid Encoder)" },
  { id: "lstm_baseline_model", name: "5. Temporal Deep LSTM Baseline (2-Layer Recurrent Multi-Step)" },
  { id: "upgraded_extreme_hybrid_pipeline", name: "6. 3-Stage Gated Extreme Hybrid Pipeline (Heavy Rain Booster)" }
];

const DEFAULT_ENDPOINTS = [
  import.meta.env.VITE_API_URL,
  "https://btp-flood-detection-system-775429752478.europe-west1.run.app/api",
  "http://localhost:8000/api",
  "http://127.0.0.1:8000/api"
].filter(Boolean) as string[];

let activeApiBase = DEFAULT_ENDPOINTS[0];

export async function fetchAvailableModels(): Promise<ModelInfo[]> {
  for (const endpoint of DEFAULT_ENDPOINTS) {
    try {
      const response = await fetch(`${endpoint}/models`, { signal: AbortSignal.timeout(3000) });
      if (response.ok) {
        const data = await response.json();
        activeApiBase = endpoint;
        return data.models && data.models.length > 0 ? data.models : DEFAULT_MODELS;
      }
    } catch {
      // try next endpoint
    }
  }

  return DEFAULT_MODELS;
}

export async function getPrediction(payload: PredictionPayload): Promise<PredictionResponse> {
  const candidateEndpoints = [activeApiBase, ...DEFAULT_ENDPOINTS.filter(e => e !== activeApiBase)];
  let lastError: any = null;

  for (const endpoint of candidateEndpoints) {
    try {
      const response = await fetch(`${endpoint}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000)
      });

      if (response.ok) {
        activeApiBase = endpoint;
        return await response.json();
      } else {
        lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("All backend prediction endpoints are unreachable.");
}


