import { useNavigate } from 'react-router-dom'

const C = {
  cyan: '#00d4ff',
  green: '#06ffa5',
  amber: '#f59e0b',
  red: '#ff4d6d',
  bg: '#04080f',
  surface: '#080f1c',
  panel: '#0c1525',
  border: '#1a2d4a',
  text: '#e2eaf5',
  muted: '#6b8ab0',
  dim: '#3d5a7a',
}

function Chip({ label, color = C.cyan }: { label: string; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 20,
      background: `${color}18`, border: `1px solid ${color}40`,
      fontSize: 12, fontWeight: 500, color,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </span>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: C.bg, color: C.text, overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '20%', right: '10%', width: 600, height: 600,
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '5%', width: 400, height: 400,
          background: 'radial-gradient(ellipse, rgba(6,255,165,0.05) 0%, transparent 70%)',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <Chip label="BTP — Flood Detection System" color={C.cyan} />
              </div>
              <h1 style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: 24,
              }}>
                <span style={{ display: 'block', color: C.text }}>Generative AI for</span>
                <span style={{
                  display: 'block',
                  background: `linear-gradient(135deg, ${C.cyan}, ${C.green})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Extreme Flood
                </span>
                <span style={{ display: 'block', color: C.text }}>Prediction.</span>
              </h1>
              <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
                A spatiotemporal deep learning platform that synthesizes satellite imagery, hydrological parameters, and rainfall data to deliver actionable flood risk intelligence.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    padding: '12px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: `linear-gradient(135deg, ${C.cyan}, ${C.green})`,
                    color: '#04080f', fontWeight: 700, fontSize: 14,
                    fontFamily: "'Exo 2', sans-serif",
                    boxShadow: `0 0 30px rgba(0,212,255,0.3)`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 0 40px rgba(0,212,255,0.5)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.transform = ''; (e.target as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.3)' }}
                >
                  Launch Dashboard →
                </button>
                <button
                  onClick={() => navigate('/progress')}
                  style={{
                    padding: '12px 28px', borderRadius: 10, cursor: 'pointer',
                    background: 'transparent',
                    border: `1px solid ${C.border}`,
                    color: C.muted, fontWeight: 500, fontSize: 14,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.cyan; (e.target as HTMLElement).style.color = C.cyan }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.border; (e.target as HTMLElement).style.color = C.muted }}
                >
                  View Progress Log
                </button>
              </div>
            </div>

            {/* Right — image pair */}
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 16, height: 460 }}>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=220&fit=crop&auto=format"
                  alt="ML data processing visualization"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,212,255,0.15), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <Chip label="ML Data Processing" color={C.cyan} />
                </div>
              </div>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                <img
                  src="https://images.unsplash.com/photo-1504608524841-42584120d693?w=700&h=220&fit=crop&auto=format"
                  alt="Satellite flood and rainfall imagery"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,255,165,0.12), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <Chip label="Satellite Rainfall Imagery" color={C.green} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Flowchart */}
      <section style={{ padding: '100px 24px', background: C.surface, position: 'relative' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.cyan, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Methodology & Approach</p>
            <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em', margin: 0 }}>The Data Pipeline</h2>
          </div>

          {/* Flowchart */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
            {/* Step 1 */}
            <FlowStep
              step="01"
              title="Inputs"
              color={C.cyan}
              isFirst
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                {['Rainfall Data', 'Spatiotemporal', 'Runoff Rates', 'Elevation DEM', 'Catchment Params'].map((item) => (
                  <Chip key={item} label={item} color={C.cyan} />
                ))}
              </div>
            </FlowStep>

            <FlowArrow color={C.cyan} />

            {/* Step 2 */}
            <FlowStep step="02" title="ML Processing" color="#7c5af5">
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { name: 'Attention-LSTM', bar: 92 },
                  { name: 'XGBoost', bar: 78 },
                  { name: 'CNN-Spatial', bar: 85 },
                ].map(m => (
                  <div key={m.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.muted, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                      <span>{m.name}</span>
                      <span style={{ color: '#7c5af5' }}>{m.bar}%</span>
                    </div>
                    <div style={{ height: 3, background: '#1a2d4a', borderRadius: 2 }}>
                      <div style={{ height: '100%', width: `${m.bar}%`, background: 'linear-gradient(90deg, #7c5af5, #00d4ff)', borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(124,90,245,0.1)', border: '1px solid rgba(124,90,245,0.3)', fontSize: 11, color: '#a78bfa', fontFamily: "'JetBrains Mono', monospace" }}>
                  Ensemble Fusion Layer
                </div>
              </div>
            </FlowStep>

            <FlowArrow color={C.green} />

            {/* Step 3 */}
            <FlowStep step="03" title="Deliverable" color={C.green} isLast>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                {[
                  { label: 'Flood Risk Score', val: '87.4', unit: '/100', color: '#ff4d6d' },
                  { label: 'Return Period', val: '25Y', unit: '', color: C.amber },
                  { label: 'Pop. Affected', val: '142K', unit: '', color: C.cyan },
                  { label: 'Alert Level', val: 'HIGH', unit: '', color: '#ff4d6d' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 6, background: `${r.color}10`, border: `1px solid ${r.color}30` }}>
                    <span style={{ fontSize: 11, color: C.muted }}>{r.label}</span>
                    <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, color: r.color, fontSize: 14 }}>{r.val}{r.unit}</span>
                  </div>
                ))}
              </div>
            </FlowStep>
          </div>
        </div>
      </section>

      {/* Comparative Analysis */}
      <section style={{ padding: '100px 24px', background: C.bg, position: 'relative' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Competitive Landscape</p>
            <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em', margin: 0 }}>Why RainCast AI Wins</h2>
          </div>

          {/* Existing solutions grid */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, color: C.dim, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" }}>Existing Solutions</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { name: 'HEC-RAS', type: 'Hydraulic Simulation', desc: 'Physics-based 1D/2D flood modeling. Accurate for known channels but requires precise survey data and weeks of setup.', limit: 'No ML, manual calibration', score: 52 },
                { name: 'SWAT Model', type: 'Hydrological Modeling', desc: 'Watershed-scale runoff simulation. Strong for agricultural basins but struggles with urban dynamics and extreme events.', limit: 'Static parameters, poor extremes', score: 61 },
                { name: 'FLOODMAP', type: 'Remote Sensing Based', desc: 'Satellite-derived inundation mapping. Good for post-event analysis but lacks predictive capability and temporal resolution.', limit: 'Reactive, not predictive', score: 44 },
              ].map(sol => (
                <div key={sol.name} style={{
                  padding: 24, borderRadius: 12,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 10px', borderRadius: '0 12px 0 8px', background: C.border, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: C.dim }}>{sol.score}/100</div>
                  <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4, color: C.text }}>{sol.name}</p>
                  <p style={{ fontSize: 11, color: C.cyan, letterSpacing: '0.1em', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>{sol.type}</p>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>{sol.desc}</p>
                  <div style={{ padding: '6px 10px', borderRadius: 6, background: 'rgba(255,77,109,0.08)', border: '1px solid rgba(255,77,109,0.2)', fontSize: 11, color: '#ff4d6d', fontFamily: "'JetBrains Mono', monospace" }}>
                    ✗ {sol.limit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Differentiator */}
          <div style={{
            padding: 40, borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(6,255,165,0.04))',
            border: `1px solid rgba(0,212,255,0.25)`,
            boxShadow: '0 0 60px rgba(0,212,255,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(0,212,255,0.1), transparent)', borderRadius: '50%' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40, position: 'relative', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.green, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>The Differentiating Factor</p>
                <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em', marginBottom: 16 }}>
                  Predictive.<br />AI-First.<br /><span style={{ color: C.cyan }}>Real-Time.</span>
                </h3>
                <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, maxWidth: 440 }}>
                  RainCast AI uniquely combines Attention-LSTM temporal modeling with XGBoost ensemble methods, trained on 30+ years of satellite-derived spatiotemporal data. Unlike rule-based systems, our model adapts to non-stationary climate patterns and delivers probabilistic flood forecasts up to 12 months ahead.
                </p>
              </div>
              <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Prediction Horizon', val: '12 Months', icon: '◈' },
                  { label: 'Model Accuracy (POD)', val: '94.7%', icon: '◉' },
                  { label: 'Extreme Event Accuracy', val: '89.2%', icon: '◆' },
                  { label: 'Data Sources Integrated', val: '14 Feeds', icon: '◇' },
                ].map(stat => (
                  <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', borderRadius: 10, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}>
                    <span style={{ color: C.cyan, fontSize: 18, fontFamily: "'JetBrains Mono', monospace" }}>{stat.icon}</span>
                    <div>
                      <p style={{ fontSize: 11, color: C.muted, margin: 0, marginBottom: 2 }}>{stat.label}</p>
                      <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 18, color: C.green, margin: 0 }}>{stat.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 24px', background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 16, margin: 0, marginBottom: 4 }}>
              Rain<span style={{ color: C.cyan }}>Cast</span> AI
            </p>
            <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>Advanced Hydrological Intelligence Platform</p>
          </div>
          <p style={{ fontSize: 12, color: C.dim, margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
            © 2024 RainCast AI · BTP Flood Detection · contact@raincast.ai
          </p>
        </div>
      </footer>
    </div>
  )
}

function FlowStep({ step, title, color, children, isFirst, isLast }: {
  step: string; title: string; color: string; children: React.ReactNode; isFirst?: boolean; isLast?: boolean
}) {
  return (
    <div style={{
      flex: '1 1 260px', minWidth: 240,
      padding: 24, borderRadius: 12,
      background: 'rgba(8,15,28,0.9)',
      border: `1px solid ${color}30`,
      boxShadow: `0 0 30px ${color}10`,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color, letterSpacing: '0.1em' }}>STEP {step}</span>
        {isFirst && <span style={{ fontSize: 10, color: '#6b8ab0', letterSpacing: '0.1em' }}>MULTI-SOURCE</span>}
        {isLast && <span style={{ fontSize: 10, color: '#6b8ab0', letterSpacing: '0.1em' }}>ACTIONABLE</span>}
      </div>
      <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 20, color, margin: 0 }}>{title}</p>
      {children}
    </div>
  )
}

function FlowArrow({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0 }}>
      <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${color}44, ${color})`, position: 'relative' }}>
        <div style={{ position: 'absolute', right: -1, top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `8px solid ${color}` }} />
      </div>
    </div>
  )
}
