import { WardFloodRisk } from '../api';

const BASE_PROFILES = [
  { id: 1, name: "Rajwada City Center", lat: 22.7196, lon: 75.8577, elev: 542.0, drain_cap: 25.0, dist_water: 120.0, tpi: -2.4, ndvi: 0.12, ndwi: 0.42, slope: 1.2, pop_dens: 24500 },
  { id: 2, name: "Bada Ganpati", lat: 22.7230, lon: 75.8480, elev: 539.5, drain_cap: 20.0, dist_water: 95.0, tpi: -2.8, ndvi: 0.10, ndwi: 0.48, slope: 0.8, pop_dens: 26800 },
  { id: 3, name: "Vijay Nagar Commercial", lat: 22.7533, lon: 75.8937, elev: 560.0, drain_cap: 45.0, dist_water: 850.0, tpi: 1.5, ndvi: 0.28, ndwi: -0.15, slope: 2.4, pop_dens: 18200 },
  { id: 4, name: "Palasia Square Corridor", lat: 22.7244, lon: 75.8839, elev: 551.2, drain_cap: 35.0, dist_water: 340.0, tpi: -0.4, ndvi: 0.22, ndwi: 0.12, slope: 1.5, pop_dens: 19500 },
  { id: 5, name: "Bhawarkuan Student Hub", lat: 22.6926, lon: 75.8676, elev: 548.0, drain_cap: 30.0, dist_water: 280.0, tpi: -0.8, ndvi: 0.18, ndwi: 0.20, slope: 1.1, pop_dens: 22400 },
  { id: 6, name: "Khajrana Green Zone", lat: 22.7300, lon: 75.9050, elev: 555.0, drain_cap: 40.0, dist_water: 620.0, tpi: 0.9, ndvi: 0.42, ndwi: -0.08, slope: 2.8, pop_dens: 14200 },
  { id: 7, name: "Rau Industrial Sector", lat: 22.6377, lon: 75.8080, elev: 565.0, drain_cap: 50.0, dist_water: 980.0, tpi: 2.1, ndvi: 0.25, ndwi: -0.22, slope: 3.2, pop_dens: 11000 },
  { id: 8, name: "Mhow Naka Riverfront", lat: 22.7050, lon: 75.8500, elev: 541.0, drain_cap: 22.0, dist_water: 80.0, tpi: -2.6, ndvi: 0.08, ndwi: 0.52, slope: 0.9, pop_dens: 25400 },
  { id: 9, name: "Annapurna Temple Sector", lat: 22.7000, lon: 75.8350, elev: 546.0, drain_cap: 28.0, dist_water: 410.0, tpi: -0.5, ndvi: 0.24, ndwi: 0.05, slope: 1.4, pop_dens: 17800 },
  { id: 10, name: "Sudama Nagar Residential", lat: 22.6950, lon: 75.8280, elev: 544.0, drain_cap: 25.0, dist_water: 290.0, tpi: -1.2, ndvi: 0.20, ndwi: 0.18, slope: 1.0, pop_dens: 21000 },
  { id: 11, name: "Geeta Bhawan Square", lat: 22.7180, lon: 75.8780, elev: 550.0, drain_cap: 32.0, dist_water: 310.0, tpi: -0.3, ndvi: 0.19, ndwi: 0.10, slope: 1.3, pop_dens: 19800 },
  { id: 12, name: "LIG Colony", lat: 22.7350, lon: 75.8880, elev: 554.0, drain_cap: 38.0, dist_water: 510.0, tpi: 0.6, ndvi: 0.31, ndwi: -0.05, slope: 2.0, pop_dens: 16500 },
  { id: 13, name: "Pardesipura Industrial", lat: 22.7400, lon: 75.8680, elev: 545.0, drain_cap: 26.0, dist_water: 210.0, tpi: -1.5, ndvi: 0.11, ndwi: 0.25, slope: 1.1, pop_dens: 23200 },
  { id: 14, name: "Nanda Nagar East", lat: 22.7480, lon: 75.8750, elev: 549.0, drain_cap: 30.0, dist_water: 390.0, tpi: -0.2, ndvi: 0.23, ndwi: 0.08, slope: 1.6, pop_dens: 18900 },
  { id: 15, name: "Airport Sector Pitam", lat: 22.7220, lon: 75.8020, elev: 562.0, drain_cap: 42.0, dist_water: 780.0, tpi: 1.8, ndvi: 0.35, ndwi: -0.18, slope: 2.5, pop_dens: 12500 }
];

export function getIndoreDefaultWards(): WardFloodRisk[] {
  const wards: WardFloodRisk[] = [];
  const baseLen = BASE_PROFILES.length;

  for (let i = 1; i <= 85; i++) {
    const ref = BASE_PROFILES[(i - 1) % baseLen];
    const latOffset = (i * 0.0015) % 0.08 - 0.04;
    const lonOffset = (i * 0.0018) % 0.08 - 0.04;
    const elev = ref.elev + ((i * 7) % 25 - 12);
    const distWater = Math.max(50, ref.dist_water + ((i * 43) % 600 - 300));
    const drainCap = Math.max(15, ref.drain_cap + ((i * 3) % 20 - 10));
    const pop = Math.max(8000, Math.min(32000, 19000 + ((i * 700) % 14000 - 7000)));
    
    const rain = 52.4;
    const runoff = Math.max(0, rain * 0.45 - (drainCap * 0.65));
    const waterDepth = Math.round((runoff / 10.0) * 10) / 10;
    
    // IPCC Hazard, Vulnerability, Exposure
    const hazard = Math.min(100, Math.max(10, (runoff / 40.0) * 80 + (elev < 545 ? 20 : 0)));
    const vuln = Math.min(100, Math.max(10, (1 - distWater / 1000) * 50 + (elev < 545 ? 30 : 10) + 15));
    const expo = Math.min(100, (pop / 30000) * 90);
    const risk = (0.80 * hazard + 0.15 * vuln + 0.05 * expo) / 100;
    
    const level: 'HIGH' | 'MODERATE' | 'LOW' = risk >= 0.65 ? 'HIGH' : risk >= 0.35 ? 'MODERATE' : 'LOW';

    wards.push({
      ward_id: i,
      ward_name: i <= baseLen ? ref.name : `Ward ${i} - Sector ${String.fromCharCode(65 + (i % 26))}`,
      latitude: ref.lat + latOffset,
      longitude: ref.lon + lonOffset,
      elevation_m: elev,
      drainage_capacity_mm: drainCap,
      predicted_rain_mm: rain,
      runoff_mm: runoff,
      water_depth_cm: waterDepth,
      risk_level: level,
      color_hex: level === 'HIGH' ? '#D9553B' : level === 'MODERATE' ? '#E0A73A' : '#3FA66D',
      hazard_score: hazard / 100,
      vulnerability_score: vuln / 100,
      exposure_score: expo / 100,
      ipcc_risk_score: risk,
      dist_to_water_m: distWater,
      tpi_value: ref.tpi,
      tpi_category: elev < 545 ? 'Valley / Low Sink' : 'Flat Plain',
      ndvi: ref.ndvi,
      ndwi: ref.ndwi,
      slope_pct: ref.slope,
      wet_days_count: 4,
      population_density: pop,
      soil_moisture: { depth_5m_pct: 54, depth_10m_pct: 48, depth_20m_pct: 42 },
      lulc_category: 'Built-up Urban'
    });
  }

  return wards;
}
