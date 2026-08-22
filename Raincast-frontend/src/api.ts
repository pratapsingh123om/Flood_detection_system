export interface ForecastDay {
  day: string;
  temp: number;
  rain: number;
  icon: string;
  intensity: number;
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
  threshold: number;
}

export interface PredictionPayload {
  model: string;
  location: string;
  timeframe?: string;
  baseline_model?: string;
  runoff: number;
  elevation: number;
  drainage: number;
}

export interface PredictionResponse {
  test_data: TestDataPoint[];
  weather_forecast: ForecastDay[];
  metrics: Metric[];
  risk_areas: RiskArea[];
}

export interface ModelInfo {
  id: string;
  name: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://btp-flood-detection-system-775429752478.europe-west1.run.app/api";

export async function fetchAvailableModels(): Promise<ModelInfo[]> {
  const response = await fetch(`${API_BASE_URL}/models`);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.models;
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

