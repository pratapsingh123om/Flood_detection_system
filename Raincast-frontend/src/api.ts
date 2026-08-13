export interface ForecastDay {
  day: string;
  temp: number;
  rain: number;
  icon: string;
  intensity: number;
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
  threshold: number;
}

export interface PredictionPayload {
  model: string;
  location: string;
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

export async function fetchAvailableModels(): Promise<ModelInfo[]> {
  const response = await fetch("https://raincast-backend-fqrk.onrender.com/api/models");
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.models;
}

export async function getPrediction(payload: PredictionPayload): Promise<PredictionResponse> {
  const response = await fetch("https://raincast-backend-fqrk.onrender.com/api/predict", {
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
