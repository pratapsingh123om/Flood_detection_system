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
    version: 'v2.4.0',
    date: '2024-11-18',
    tag: 'Major Release',
    tagColor: C.cyan,
    added: [
      'Attention-LSTM with temporal self-attention for 12-month horizon forecasting',
      'Real-time satellite feed integration (INSAT-3DR + Sentinel-1)',
      'Geospatial heatmap overlay with district-level risk granularity',
    ],
    why: 'Standard LSTM lacked the ability to weigh historical flood events non-uniformly. The attention mechanism allows the model to focus on analogous historical monsoon patterns regardless of how far back they occurred.',
    improved: [
      { label: 'Prediction Accuracy', from: '81.2%', to: '94.1%', delta: '+12.9%' },
      { label: 'Extreme Event POD', from: '0.71', to: '0.947', delta: '+0.237' },
      { label: 'Forecast Horizon', from: '30 days', to: '12 months', delta: '12×' },
    ],
  },
  {
    version: 'v2.3.1',
    date: '2024-10-05',
    tag: 'Model Update',
    tagColor: C.purple,
    added: [
      'XGBoost ensemble layer for short-range (0–72hr) event classification',
      'Adaptive threshold calibration based on regional drainage coefficients',
      'Multi-model confidence intervals on all outputs',
    ],
    why: 'LSTM performs well at trend forecasting but underperforms on sudden high-magnitude events. XGBoost captures feature interactions for acute rainfall-runoff dynamics that deep networks smooth over.',
    improved: [
      { label: 'FAR (False Alarm Rate)', from: '0.231', to: '0.082', delta: '-64.5%' },
      { label: 'Extreme FAR', from: '0.312', to: '0.113', delta: '-63.8%' },
      { label: 'CSI Score', from: '0.69', to: '0.871', delta: '+0.181' },
    ],
  },
  {
    version: 'v2.2.0',
    date: '2024-08-22',
    tag: 'Data Pipeline',
    tagColor: C.green,
    added: [
      'Spatiotemporal data fusion: IMD gridded rainfall + CWC discharge + SRTM elevation',
      'Automated runoff coefficient estimation using soil moisture index',
      'Catchment delineation from 30m DEM with GIS topology validation',
    ],
    why: 'Single-source rainfall data failed to capture the complex interplay between upstream discharge, soil saturation state, and morphological factors. A fused multi-source pipeline reduces input uncertainty by 38%.',
    improved: [
      { label: 'Input Feature Set', from: '6 variables', to: '14 variables', delta: '+8 sources' },
      { label: 'Spatial Resolution', from: '25km grid', to: '5km grid', delta: '5× finer' },
      { label: 'Data Latency', from: '6 hours', to: '45 minutes', delta: '−87.5%' },
    ],
  },
  {
    version: 'v2.1.0',
    date: '2024-06-10',
    tag: 'Infrastructure',
    tagColor: C.amber,
    added: [
      'Streaming data ingestion pipeline with Apache Kafka integration',
      'Progress log and changelog system (this page)',
      'REST API v2 for downstream emergency management system integrations',
    ],
    why: 'Batch processing introduced 6-hour forecast lags which made the system useless for early warning. Streaming architecture brings alert latency below 5 minutes from rainfall event onset.',
    improved: [
      { label: 'Alert Latency', from: '6 hours', to: '<5 min', delta: '−98.6%' },
      { label: 'System Uptime', from: '91.2%', to: '99.7%', delta: '+8.5pp' },
      { label: 'API Response Time', from: '1.8s', to: '120ms', delta: '−93.3%' },
    ],
  },
  {
    version: 'v2.0.0',
    date: '2024-03-01',
    tag: 'Foundation',
    tagColor: C.dim,
    added: [
      'Core LSTM architecture trained on 30 years of Narmada basin historical data',
      'Initial dashboard UI with static map and forecast chart',
      'Batch model inference with daily update cycle',
    ],
    why: 'Initial proof-of-concept validated that deep learning outperforms traditional hydrological simulation (HEC-RAS, SWAT) on held-out extreme event test sets, justifying continued investment.',
    improved: [
      { label: 'vs. HEC-RAS (POD)', from: '0.62', to: '0.81', delta: '+0.19' },
      { label: 'vs. SWAT (CSI)', from: '0.54', to: '0.69', delta: '+0.15' },
      { label: 'Setup Time', from: '3 weeks', to: '< 1 day', delta: '20× faster' },
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
