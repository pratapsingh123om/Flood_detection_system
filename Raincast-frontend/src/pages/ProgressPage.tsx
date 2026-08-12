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
    version: 'v1.3.0',
    date: '2026-08-12',
    tag: 'Feature',
    tagColor: C.purple,
    added: [
      'Autoregressive 30-Day Future Forecasting Engine',
      'OpenMeteo Baseline 16-Day API Integration',
      'Dynamic Metric Calculation (Accuracy, CSI, POD, FAR, RMSE, MAE)',
    ],
    why: 'We needed true predictive capabilities beyond historical test evaluation. The autoregressive loop feeds predictions back into the model to predict 30 days ahead without exogenous variables, while OpenMeteo provides a baseline comparison.',
    improved: [
      { label: 'Forecast Horizon', from: 'Past Evaluation', to: '30 Days Future', delta: 'New' },
      { label: 'Metric Fidelity', from: 'Hardcoded UI', to: 'Dynamic from Test Set', delta: 'Live' },
      { label: 'External Validation', from: 'None', to: 'OpenMeteo Overlay', delta: 'Added' },
    ],
  },
  {
    version: 'v1.2.0',
    date: '2026-08-11',
    tag: 'Model Update',
    tagColor: C.cyan,
    added: [
      'Upgraded Extreme Hybrid Pipeline (Default Model)',
      'Physics Gated Quantile Pipeline & Two-Stage Hybrid',
      'XGBoost, RandomForest, LightGBM & CatBoost Base Models',
    ],
    why: 'Single models struggle with extreme rainfall events. The Upgraded Extreme Hybrid pipeline combines classifiers and regressors to filter out noise, achieving the highest Extreme CSI score in our evaluation suite.',
    improved: [
      { label: 'Extreme CSI Score', from: '0.316 (Two-Stage)', to: '0.361 (Upgraded Hybrid)', delta: '+14.2%' },
      { label: 'False Alarm Rate (FAR)', from: '0.518 (XGBoost)', to: '0.125 (Upgraded Hybrid)', delta: '-75.8%' },
      { label: 'Critical Success Index', from: '0.480 (XGBoost)', to: '0.814 (Upgraded Hybrid)', delta: '+69.5%' },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2026-08-10',
    tag: 'UI/UX & Map',
    tagColor: C.green,
    added: [
      'Dynamic Model Discovery API (/api/models)',
      'Live React-Leaflet Map Integration with Nominatim Geocoding',
      'Pending States for Hydrological Parameters & Risk Zones',
    ],
    why: 'The dashboard needed to be tied directly to backend ML capabilities rather than static mockups. The new map visually represents predicted rainfall intensity, and the model dropdown dynamically scans the models/ folder.',
    improved: [
      { label: 'Map Tech', from: 'Static CSS', to: 'React-Leaflet', delta: 'Interactive' },
      { label: 'Model Selection', from: 'Hardcoded', to: 'Dynamic Directory Scan', delta: 'Automated' },
      { label: 'UI Accuracy', from: 'Fake Sliders', to: 'Pending States', delta: 'Honest' },
    ],
  }
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
