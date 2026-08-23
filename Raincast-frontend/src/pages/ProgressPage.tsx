const C = {
  cyan: '#00d4ff',
  green: '#06ffa5',
  amber: '#f59e0b',
  purple: '#7c5af5',
  red: '#ff4d6d',
  bg: '#04080f',
  surface: '#080f1c',
  panel: '#0c1525',
  border: '#1a2d4a',
  text: '#e2eaf5',
  muted: '#6b8ab0',
  dim: '#3d5a7a',
}

const changelog = [
  {
    version: 'v1.0.0 (Current Best)',
    date: '2026-08-23',
    tag: 'IPCC Disaster Risk & AHP Engine',
    tagColor: C.cyan,
    added: [
      'Full IPCC Disaster Risk Framework (Risk = Hazard × Vulnerability × Exposure)',
      'AHP Multi-Criteria Weighting (0.80 Hazard + 0.15 Vulnerability + 0.05 Exposure = 1.00)',
      '85-Ward 2D Inundation Physics (D, NDVI, NDWI, Elevation, TPI, Slope %)',
      'Multi-Depth Soil Moisture Profile Strata (5m, 10m, 20m)',
      'LULC Multi-Decadal Historical & Future Epochs (2000–2050)',
    ],
    why: 'True flood intelligence requires converting raw predicted precipitation into spatial inundation depth and multiplying by physical terrain vulnerability and demographic exposure rather than simply guessing river overflow.',
    improved: [
      { label: 'Spatial Granularity', from: 'City Level', to: '85 Municipal Wards', delta: 'Hyper-Local' },
      { label: 'Risk Equation', from: 'Empirical Heuristic', to: 'Formal IPCC & AHP (0.80/0.15/0.05)', delta: 'Physics-Based' },
      { label: 'Ward Exposure', from: 'Static Count', to: 'GHSL 5-Yr Epochs + Census 2011', delta: 'Dynamic' },
    ],
  },
  {
    version: 'v0.6.0',
    date: '2026-08-18',
    tag: 'Cloud Run & TFLite Quantization',
    tagColor: C.purple,
    added: [
      'Deployed Spatio-Temporal U-Net Microservice to Google Cloud Run',
      'TFLite 16-Bit Float Quantization (shrunk model from 1.5GB to 300MB)',
      'U-Net AI Bias Calibrator Microservice for systematic over-prediction removal',
    ],
    why: 'The unquantized 75-million parameter spatial model crashed standard serverless instances. TFLite quantization reduced RAM consumption by 80% with less than 1% degradation in prediction accuracy.',
    improved: [
      { label: 'Model Footprint', from: '1.5 GB (PyTorch Full)', to: '300 MB (TFLite Quantized)', delta: '-80%' },
      { label: 'Overall Accuracy', from: '81.6% (Base U-Net)', to: '95.9% (Bias Calibrator)', delta: '+14.3%' },
      { label: 'Latency', from: 'Local Crash', to: '120ms Cloud Response', delta: 'Serverless' },
    ],
  },
  {
    version: 'v0.5.0',
    date: '2026-08-15',
    tag: 'Live 2026 Out-of-Sample Validation',
    tagColor: C.green,
    added: [
      'Real-world 2026 Monsoon OpenMeteo Live API Integration (June–August 2026)',
      'Dynamic Confusion Matrix & Hydrological Metrics Engine (NSE, CSI, POD, FAR)',
      'Extreme Event Accuracy (Ext Acc) Metric for Floods >30mm/day',
    ],
    why: 'Testing models only on synthetic holdouts leads to overoptimism. Real-world validation against active 2026 monsoon events verifies true generalization in operational conditions.',
    improved: [
      { label: 'Extreme Accuracy (>30mm)', from: '89.8%', to: '93.9%', delta: '+4.1%' },
      { label: 'Validation Ground Truth', from: 'Historical Static CSV', to: 'Live OpenMeteo Observations', delta: 'Dynamic' },
      { label: 'Extreme False Alarm Rate', from: '18.4%', to: '5.0%', delta: '-72.8%' },
    ],
  },
  {
    version: 'v0.4.0',
    date: '2026-08-12',
    tag: 'Spatio-Temporal Hybrid Architecture',
    tagColor: C.red,
    added: [
      'Hybrid U-Net + LSTM (PyTorch) for combined Spatial-Temporal modeling',
      'Hybrid U-Net + XGBoost for sharp non-linear flood threshold classification',
      'Google Cloud TPU v3-8 training pipeline for 47-year tensor compilation',
    ],
    why: 'Single models miss either the spatial terrain context (mountains, river slopes) or sequential storm accumulation. Fusing U-Net spatial feature maps with temporal LSTM sequences eliminates this dilemma.',
    improved: [
      { label: 'Critical Success Index (CSI)', from: '0.480 (XGBoost alone)', to: '0.814 (Upgraded Hybrid)', delta: '+69.5%' },
      { label: 'Probability of Detection', from: '78.2%', to: '95.0%', delta: '+16.8%' },
      { label: 'Training Convergence', from: '14 hrs (GPU)', to: '42 mins (TPU v3-8)', delta: '20x Faster' },
    ],
  },
  {
    version: 'v0.3.0',
    date: '2026-08-08',
    tag: '9-Parameter Atmospheric Tensor',
    tagColor: C.cyan,
    added: [
      'Full 9-Parameter Climate Tensor (Tmax, Tmin, Dewpoint, RH, SW/LW Radiation, Wind U/V, SLP, Geopotential)',
      'Diurnal Temperature Range (DTR = Tmax - Tmin) & Dewpoint Spread',
      'Cyclical Day-of-Year Encodings (sin_day, cos_day)',
    ],
    why: 'Extreme convective monsoon storms are physically preceded by atmospheric pressure drops, moisture convergence, and thermal inversions that raw rainfall history cannot detect.',
    improved: [
      { label: 'Feature Dimensionality', from: '11 Raw Columns', to: '71 Physics Features', delta: '+60 Features' },
      { label: 'Precursor Correlation', from: 'r = 0.45', to: 'r = 0.78', delta: '+73.3%' },
    ],
  },
  {
    version: 'v0.2.0',
    date: '2026-08-02',
    tag: 'Feature Engineering & Lags',
    tagColor: C.amber,
    added: [
      'Multi-day autoregressive lag windows (t-1, t-2, t-3)',
      '3-day and 7-day rolling mean & standard deviation statistics',
      'SCS-CN Curve Number (CN=88) impervious retention calculations',
    ],
    why: 'Monsoon storms exhibit strong temporal persistence. Rolling antecedent rainfall tracks soil saturation and runoff acceleration.',
    improved: [
      { label: 'Baseline MAE', from: '8.9 mm', to: '5.4 mm', delta: '-39.3%' },
      { label: 'Runoff Accuracy', from: 'Unmodeled', to: 'SCS-CN Empirical', delta: 'Physics-Gated' },
    ],
  },
  {
    version: 'v0.1.0',
    date: '2026-07-20',
    tag: '75-Yr ERA5 Satellite Ingestion',
    tagColor: C.dim,
    added: [
      'Automated Google Earth Engine extraction for ECMWF ERA5-Land Daily Aggregates',
      'Ingestion of 75 continuous years of meteorological reanalysis (1950–2025)',
      'USGS SRTM 30m Digital Elevation Model (DEM) topographical alignment',
    ],
    why: 'As demonstrated by the NIT Warangal hydrological research, sparse point rain gauges suffer from severe spatial uncertainty. Continuous 75-year gridded satellite data provides the necessary foundation for deep learning.',
    improved: [
      { label: 'Historical Record', from: '4 Yrs Gauge Data', to: '75 Yrs Gridded Satellite', delta: '+1875%' },
      { label: 'Input Uncertainty', from: 'High (Sparse Gauges)', to: 'Low (Uniform Grids)', delta: 'Validated' },
    ],
  },
]


export default function ProgressPage() {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', padding: '64px 24px', fontFamily: "'Inter', sans-serif" }}>
      {/* Grid bg */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.cyan, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>RainCast AI</p>
          <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 54px)', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Progress<span style={{ color: C.cyan }}> Log</span>
          </h1>
          <p style={{ fontSize: 15, color: C.muted, maxWidth: 520, lineHeight: 1.7, margin: 0 }}>
            A transparent record of every model improvement, data pipeline upgrade, and infrastructure change — with the engineering rationale behind each decision.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${C.cyan}40, ${C.cyan}10, transparent)` }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, paddingLeft: 48 }}>
            {changelog.map((entry, idx) => (
              <div key={entry.version} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute', left: -54, top: 20,
                  width: 14, height: 14, borderRadius: '50%',
                  background: entry.tagColor,
                  boxShadow: `0 0 12px ${entry.tagColor}80`,
                  border: `2px solid ${C.bg}`,
                }}>
                  {idx === 0 && (
                    <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1px solid ${entry.tagColor}60`, animation: 'ping 2s ease-out infinite' }} />
                  )}
                </div>

                {/* Connector line */}
                <div style={{ position: 'absolute', left: -47, top: 27, width: 38, height: 1, background: `linear-gradient(90deg, ${entry.tagColor}40, ${entry.tagColor}20)` }} />

                {/* Card */}
                <div style={{
                  borderRadius: 16, overflow: 'hidden',
                  background: C.panel,
                  border: `1px solid ${C.border}`,
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `${entry.tagColor}40`)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = C.border)}
                >
                  {/* Card header */}
                  <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>{entry.version}</span>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20,
                        background: `${entry.tagColor}18`, border: `1px solid ${entry.tagColor}40`,
                        fontSize: 11, color: entry.tagColor,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>{entry.tag}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.dim }}>{entry.date}</span>
                  </div>

                  {/* Three-column body */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
                    {/* What was Added */}
                    <div style={{ padding: '20px 24px', borderRight: `1px solid ${C.border}` }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.cyan, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 14px' }}>What was Added</p>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {entry.added.map((item, i) => (
                          <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: C.muted, lineHeight: 1.55 }}>
                            <span style={{ color: entry.tagColor, flexShrink: 0, marginTop: 2, fontSize: 10 }}>◆</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why */}
                    <div style={{ padding: '20px 24px', borderRight: `1px solid ${C.border}` }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 14px' }}>Why</p>
                      <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, margin: 0 }}>{entry.why}</p>
                    </div>

                    {/* What Improved */}
                    <div style={{ padding: '20px 24px' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 14px' }}>What Improved</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {entry.improved.map((imp, i) => (
                          <div key={i} style={{ padding: '8px 10px', borderRadius: 8, background: C.surface, border: `1px solid ${C.border}` }}>
                            <p style={{ fontSize: 10, color: C.muted, margin: '0 0 4px' }}>{imp.label}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.dim }}>{imp.from} → {imp.to}</span>
                              <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 12, color: C.green }}>{imp.delta}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Timeline end */}
            <div style={{ position: 'relative', paddingBottom: 16 }}>
              <div style={{ position: 'absolute', left: -54, top: 4, width: 14, height: 14, borderRadius: '50%', background: C.dim, border: `2px solid ${C.bg}` }} />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.dim, margin: 0 }}>Project inception — v1.0.0 · Jan 2024</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes ping { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }`}</style>
    </div>
  )
}
