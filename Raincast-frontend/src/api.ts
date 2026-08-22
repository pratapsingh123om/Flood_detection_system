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
