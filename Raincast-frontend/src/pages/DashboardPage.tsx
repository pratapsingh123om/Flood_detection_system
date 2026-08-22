import React, { useState, useEffect, useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Area, ComposedChart,
} from 'recharts'
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { getPrediction, fetchAvailableModels, ModelInfo } from '../api'

const C = {
  cyan: '#00d4ff',
  green: '#06ffa5',
  amber: '#f59e0b',
  red: '#ff4d6d',
  purple: '#7c5af5',
  bg: '#04080f',
  surface: '#080f1c',
  panel: '#0c1525',
  border: '#1a2d4a',
  borderBright: '#1e3a5f',
  text: '#e2eaf5',
  muted: '#6b8ab0',
  dim: '#3d5a7a',
}

export default function DashboardPage() {
  const [location, setLocation] = useState('Indore, Madhya Pradesh')
  const [model, setModel] = useState('attention-lstm')
  const [timeframe, setTimeframe] = useState<string>('test')
  const [showOpenMeteo, setShowOpenMeteo] = useState(false)
  const [baselineModel, setBaselineModel] = useState("MPI_ESM1_2_XR")
  const [runoff, setRunoff] = useState(62)
  const [elevation, setElevation] = useState(531)
  const [drainage, setDrainage] = useState(78)
  
  const [loading, setLoading] = useState(false)
  const [forecastData, setForecastData] = useState<any[]>([])
  const [weatherForecast, setWeatherForecast] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any[]>([])
  const [riskAreas, setRiskAreas] = useState<any[]>([])
  const [availableModels, setAvailableModels] = useState<ModelInfo[]>([])
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.7196, 75.8577])

  const comparativeMetrics = useMemo(() => {
    if (timeframe === 'test' || !forecastData || forecastData.length === 0) return null;
    
    let totalActual = 0;
    let totalPredicted = 0;
    let sumSquaredError = 0;
    let maxActual = 0;
    let maxPredicted = 0;

    for (const d of forecastData) {
      totalActual += d.actual;
      totalPredicted += d.predicted;
      sumSquaredError += Math.pow(d.predicted - d.actual, 2);
      if (d.actual > maxActual) maxActual = d.actual;
      if (d.predicted > maxPredicted) maxPredicted = d.predicted;
    }

    const n = forecastData.length;
    const rmse = Math.sqrt(sumSquaredError / n).toFixed(1);
    const deviationPct = totalActual > 0 ? (((totalPredicted - totalActual) / totalActual) * 100).toFixed(1) : "0.0";
    const peakSuppression = (maxActual - maxPredicted).toFixed(1);
    
    let sumAbsError = 0;
    for (const d of forecastData) {
      sumAbsError += Math.abs(d.predicted - d.actual);
    }
    const mae = sumAbsError / n;
    const meanActual = totalActual / n;
    const matchingPct = meanActual > 0 ? Math.max(0, 100 - ((mae / meanActual) * 100)).toFixed(1) : "0.0";

    return [
      { label: "Total Deviation", val: `${deviationPct > 0 ? '+' : ''}${deviationPct}%`, color: parseFloat(deviationPct) > 0 ? C.red : C.green },
      { label: "Deviation RMSE", val: `${rmse}mm`, color: C.amber },
      { label: "Peak Suppress", val: `${peakSuppression > 0 ? '-' : '+'}${Math.abs(parseFloat(peakSuppression)).toFixed(1)}mm`, color: C.cyan },
      { label: "Matching", val: `${matchingPct}%`, color: C.purple },
    ];
  }, [forecastData, timeframe]);

  useEffect(() => {
    if (!location) return
    const fetchCoords = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`)
        const data = await res.json()
        if (data && data.length > 0) {
          setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)])
        }
      } catch (e) {
        console.error("Geocoding failed", e)
      }
    }
    const t = setTimeout(fetchCoords, 800)
    return () => clearTimeout(t)
  }, [location])

  useEffect(() => {
    const loadModels = async () => {
      try {
        const models = await fetchAvailableModels()
        setAvailableModels(models)
        // If the current model isn't in the list, default to the first one
        if (models.length > 0 && !models.find(m => m.id === model)) {
          setModel(models[0].id)
        }
      } catch (e) {
        console.error("Failed to fetch available models", e)
      }
    }
    loadModels()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const data = await getPrediction({
          location,
          model,
          timeframe,
          baseline_model: baselineModel,
          runoff,
          elevation,
          drainage
        })
        setForecastData(data.test_data)
        setWeatherForecast(data.weather_forecast)
        setMetrics(data.metrics)
        setRiskAreas(data.risk_areas)
      } catch (err) {
        console.error("Failed to load prediction data", err)
      } finally {
        setLoading(false)
      }
    }
    
    // Add a small debounce or direct call (for simplicity direct call)
    const timeoutId = setTimeout(() => {
      loadData()
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }, [location, model, timeframe, baselineModel, runoff, elevation, drainage])

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* Top search bar */}
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, background: C.surface }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 480 }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.cyan }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Select Location (e.g., Indore)..."
              style={{
                width: '100%', padding: '10px 14px 10px 40px',
                background: C.panel, border: `1px solid ${C.border}`,
                borderRadius: 10, color: C.text, fontSize: 14,
                outline: 'none', fontFamily: "'Inter', sans-serif",
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = C.cyan)}
              onBlur={e => (e.target.style.borderColor = C.border)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: loading ? C.amber : C.green, boxShadow: `0 0 8px ${loading ? C.amber : C.green}`, display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}>
              {loading ? 'SYNCING...' : 'LIVE — CONNECTED TO ML MODEL'}
            </span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20 }}>

          {/* Left — Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              borderRadius: 14, overflow: 'hidden',
              border: `1px solid ${C.borderBright}`,
              background: C.panel,
              height: 460,
              position: 'relative',
              boxShadow: `0 0 40px rgba(0,212,255,0.08)`,
            }}>
              {/* Live Interactive Map */}
              <MapContainer center={mapCenter} zoom={11} style={{ position: 'absolute', inset: 0, borderRadius: 14, zIndex: 1 }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapUpdater center={mapCenter} />
                {forecastData.length > 0 && (
                  <Circle 
                    center={mapCenter} 
                    radius={10000} 
                    pathOptions={{ 
                      color: forecastData[0].predicted > 30 ? C.red : forecastData[0].predicted > 10 ? C.amber : C.cyan, 
                      fillColor: forecastData[0].predicted > 30 ? C.red : forecastData[0].predicted > 10 ? C.amber : C.cyan, 
                      fillOpacity: 0.35 
                    }} 
                  />
                )}
              </MapContainer>
              <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
                <div style={{ padding: '6px 12px', borderRadius: 6, background: 'rgba(4,8,15,0.85)', border: `1px solid rgba(0,212,255,0.2)`, fontSize: 11, color: C.cyan, fontFamily: "'JetBrains Mono', monospace" }}>
                  {location.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Bottom — Chart + Risk areas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20 }}>
              {/* Chart */}
              <div style={{ background: C.panel, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 15, margin: 0, marginBottom: 2 }}>{timeframe === 'month' ? "CMIP6 Climate Projection (Aug-Sep 2027)" : timeframe === 'year' ? "CMIP6 Climate Projection (Jul-Aug 2027)" : "Model Evaluation (Jul-Aug 2026)"}</p>
                    <p style={{ fontSize: 11, color: C.muted, margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>{timeframe !== 'test' ? "CMIP6 Baseline vs AI Prediction" : "Actual vs Predicted Rainfall"} · {location.split(',')[0]}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", alignItems: 'center', flexWrap: 'wrap' }}>
                    {timeframe !== 'test' && <span style={{ color: C.cyan }}>── CMIP of India</span>}
                    <span style={{ color: C.red }}>── {timeframe === 'test' ? "Predicted" : "AI Prediction"}</span>
                    {timeframe === 'test' && <span style={{ color: C.cyan }}>── Actual</span>}
                    {timeframe === 'test' && <span style={{ color: C.amber, opacity: 0.7 }}>- - Threshold</span>}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <ComposedChart data={forecastData}>
                    <defs>
                      <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.cyan} stopOpacity={0.15}/>
                        <stop offset="95%" stopColor={C.cyan} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="floodGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.red} stopOpacity={0.15}/>
                        <stop offset="95%" stopColor={C.red} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" stroke={C.dim} tick={{ fontSize: 10, fill: C.muted, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                    <YAxis stroke={C.dim} tick={{ fontSize: 10, fill: C.muted, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                    {timeframe === 'test' && <ReferenceLine y={30} stroke={C.amber} strokeDasharray="4 4" strokeOpacity={0.6} />}
                    {timeframe === 'test' && <Area type="monotone" dataKey="actual" stroke={C.cyan} strokeWidth={2} fill="url(#rainGrad)" />}
                    {timeframe !== 'test' && <Line type="monotone" dataKey="default_cmip" stroke={C.cyan} strokeWidth={2} dot={false} strokeDasharray="3 3" opacity={0.8} />}
                    <Area type="monotone" dataKey="predicted" stroke={C.red} strokeWidth={2} fill="url(#floodGrad)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Risk areas */}
              <div style={{ background: C.panel, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20 }}>
                <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 14, margin: '0 0 16px' }}>Most Risk-Prone Areas</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center', height: 180 }}>
                  <p style={{ color: C.muted, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>Pending Spatial Model Training...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* 7-day forecast */}
            <div style={{ background: C.panel, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16 }}>
              <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, margin: '0 0 12px', color: C.muted, letterSpacing: '0.05em' }}>7-DAY RAINFALL FORECAST</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                {weatherForecast.map(day => (
                  <div key={day.day} style={{
                    padding: '8px 4px', borderRadius: 10, textAlign: 'center',
                    background: `rgba(0,212,255,${day.intensity * 0.12})`,
                    border: `1px solid rgba(0,212,255,${0.1 + day.intensity * 0.2})`,
                    backdropFilter: 'blur(8px)',
                    position: 'relative'
                  }}>
                    {/* AI Status Flag */}
                    <div 
                      title={day.is_fallback ? "Using fallback cache (AI Inference failed or loading)" : "AI Predicted"}
                      style={{
                        position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%',
                        background: day.is_fallback ? '#f5a623' : '#2ecc71',
                        boxShadow: `0 0 5px ${day.is_fallback ? '#f5a623' : '#2ecc71'}`
                      }}
                    />
                    <p style={{ fontSize: 9, color: C.muted, margin: '0 0 4px', fontFamily: "'JetBrains Mono', monospace" }}>{day.day}</p>
                    <p style={{ fontSize: 18, margin: '0 0 4px' }}>{day.icon}</p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.cyan, margin: '0 0 2px', fontFamily: "'Exo 2', sans-serif" }}>{day.rain}mm</p>
                    <p style={{ fontSize: 9, color: C.dim, margin: 0 }}>{day.temp}°C</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Model selection */}
            <div style={{ background: C.panel, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16 }}>
              <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, margin: '0 0 10px', color: C.muted, letterSpacing: '0.05em' }}>PREDICTIVE MODEL</p>
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px',
                  background: C.surface, border: `1px solid ${C.borderBright}`,
                  borderRadius: 8, color: C.cyan, fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: 'none', cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2300d4ff' stroke-width='1.5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                }}
              >
                {availableModels.length === 0 ? (
                  <option value={model}>Loading models...</option>
                ) : (
                  availableModels.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))
                )}
              </select>

              {/* Timeframe toggles */}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {['test', 'month', 'year'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    style={{
                      flex: 1, padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                      background: timeframe === t ? `rgba(0,212,255,0.15)` : 'transparent',
                      border: timeframe === t ? `1px solid rgba(0,212,255,0.4)` : `1px solid ${C.border}`,
                      color: timeframe === t ? C.cyan : C.muted,
                      fontSize: 12, fontWeight: timeframe === t ? 600 : 400,
                      fontFamily: "'Inter', sans-serif",
                      transition: 'all 0.2s',
                    }}
                  >
                    {t === 'test' ? 'Test Data' : t === 'month' ? 'Next Month' : 'Next Year'}
                  </button>
                ))}
              </div>
            </div>

            {/* Performance metrics */}
            {timeframe === 'test' && (
              <div style={{ background: C.panel, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16 }}>
                <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, margin: '0 0 12px', color: C.muted, letterSpacing: '0.05em' }}>PERFORMANCE METRICS</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {metrics.map(m => (
                    <div key={m.label} style={{ padding: '8px', borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.dim, margin: '0 0 2px', letterSpacing: '0.05em' }}>{m.label}</p>
                      <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 14, color: m.color, margin: 0 }}>{m.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparative metrics */}
            {timeframe !== 'test' && comparativeMetrics && (
              <div style={{ background: C.panel, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16 }}>
                <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, margin: '0 0 12px', color: C.purple, letterSpacing: '0.05em' }}>COMPARATIVE METRICS</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {comparativeMetrics.map(m => (
                    <div key={m.label} style={{ padding: '8px', borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.dim, margin: '0 0 2px', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.label}</p>
                      <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 14, color: m.color, margin: 0 }}>{m.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hydrological parameters */}
            <div style={{ background: C.panel, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16 }}>
              <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, margin: '0 0 14px', color: C.muted, letterSpacing: '0.05em' }}>HYDROLOGICAL PARAMETERS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: 0.4, pointerEvents: 'none' }}>
                <Slider label="Runoff Rate (Pending)" value={runoff} min={0} max={100} unit="mm/hr" color={C.cyan} onChange={setRunoff} />
                <Slider label="Elevation (Pending)" value={elevation} min={400} max={800} unit="m" color={C.green} onChange={setElevation} />
                <Slider label="Drainage (Pending)" value={drainage} min={0} max={100} unit="%" color={C.amber} onChange={setDrainage} />
              </div>
            </div>

            {/* Key risk indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              <RiskBadge label="Population Affected" value="142K" icon="👥" color={C.cyan} />
              <RiskBadge label="Flood Risk Score" value="Pending" icon="⚠" color={C.muted} />
              <RiskBadge label="Return Period" value="Pending" icon="🔄" color={C.muted} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slider({ label, value, min, max, unit, color, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; color: string; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: '#6b8ab0' }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color }}>{value}{unit}</span>
      </div>
      <div style={{ position: 'relative', height: 4, background: '#1a2d4a', borderRadius: 2 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}66, ${color})`, borderRadius: 2 }} />
        <input
          type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="range-slider"
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', height: '100%', margin: 0 }}
        />
        <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, pointerEvents: 'none' }} />
      </div>
    </div>
  )
}

function RiskBadge({ label, value, icon, color, alert }: { label: string; value: string; icon: string; color: string; alert?: boolean }) {
  return (
    <div style={{
      padding: '14px 12px', borderRadius: 12, textAlign: 'center',
      background: alert ? `rgba(255,77,109,0.08)` : `${color}0a`,
      border: `1px solid ${alert ? 'rgba(255,77,109,0.35)' : color + '25'}`,
      boxShadow: alert ? `0 0 20px rgba(255,77,109,0.1)` : 'none',
    }}>
      <span style={{ fontSize: 20, display: 'block', marginBottom: 6 }}>{icon}</span>
      <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 18, color, margin: '0 0 4px' }}>{value}</p>
      <p style={{ fontSize: 9, color: '#6b8ab0', margin: 0, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.4 }}>{label}</p>
    </div>
  )
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  map.setView(center, map.getZoom())
  return null
}
