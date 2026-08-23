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

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://btp-flood-detection-system-775429752478.europe-west1.run.app/api";

export async function fetchAvailableModels(): Promise<ModelInfo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/models`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.models;
  } catch (err) {
    return [
      { id: "unet_lstm_bias", name: "Hybrid U-Net + LSTM (PyTorch)" },
      { id: "unet_rf_bias", name: "Hybrid U-Net + XGBoost" },
      { id: "unet_bias_model", name: "U-Net AI Bias Calibrator (Keras)" }
    ];
  }
}

export async function getPrediction(payload: PredictionPayload): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

