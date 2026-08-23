import { useNavigate } from 'react-router-dom'

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

function Chip({ label, color = C.cyan }: { label: string; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 20,
      background: `${color}18`, border: `1px solid ${color}40`,
      fontSize: 12, fontWeight: 600, color,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </span>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: C.bg, color: C.text, overflowX: 'hidden' }}>

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        <div style={{
          position: 'absolute', top: '15%', right: '8%', width: 550, height: 550,
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.1) 0%, transparent 70%)',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'center' }}>
            
            {/* Left Narrative */}
            <div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                <Chip label="BTP Capstone & Research State" color={C.cyan} />
                <Chip label="75-Yr ERA5 + 30m SRTM DEM" color={C.green} />
                <Chip label="IPCC Risk Framework" color={C.purple} />
              </div>

              <h1 style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 20,
              }}>
                Physics-Hybrid AI for <br />
                <span style={{
                  background: `linear-gradient(135deg, ${C.cyan}, ${C.green})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Hyper-Local Extreme Flood
                </span><br />
                Risk Intelligence.
              </h1>

              <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, maxWidth: 580, marginBottom: 32 }}>
                Moving beyond coarse global models that systematically miss extreme rainfall. RainCast AI fuses 75 years of gridded satellite meteorology with 30m physical topography and the full IPCC Disaster Risk Framework (<strong style={{ color: C.text }}>Hazard × Vulnerability × Exposure</strong>).
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    padding: '14px 32px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: `linear-gradient(135deg, ${C.cyan}, ${C.green})`,
                    color: '#04080f', fontWeight: 800, fontSize: 14,
                    fontFamily: "'Exo 2', sans-serif",
                    boxShadow: `0 0 30px rgba(0,212,255,0.35)`,
                    transition: 'all 0.2s',
                  }}
                >
                  Enter Live Dashboard →
                </button>
                <button
                  onClick={() => navigate('/progress')}
                  style={{
                    padding: '14px 28px', borderRadius: 10, cursor: 'pointer',
                    background: C.panel,
                    border: `1px solid ${C.border}`,
                    color: C.text, fontWeight: 600, fontSize: 14,
                    transition: 'all 0.2s',
                  }}
                >
                  Explore Research Evolution (v0.1 → v1.0)
                </button>
              </div>
            </div>

            {/* Right Summary Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                background: C.panel, border: `1px solid ${C.borderBright}`,
                borderRadius: 14, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: C.cyan }}>CURRENT BEST BENCHMARK</span>
                  <span style={{ fontSize: 11, background: 'rgba(6,255,165,0.15)', color: C.green, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>VERIFIED</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  <div style={{ background: C.surface, padding: 12, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <p style={{ margin: 0, fontSize: 11, color: C.muted }}>Nash-Sutcliffe (NSE)</p>
                    <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 800, color: C.green, fontFamily: "'Exo 2', sans-serif" }}>0.42+</p>
                  </div>
                  <div style={{ background: C.surface, padding: 12, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <p style={{ margin: 0, fontSize: 11, color: C.muted }}>Extreme CSI (&gt;30mm)</p>
                    <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 800, color: C.cyan, fontFamily: "'Exo 2', sans-serif" }}>0.814</p>
                  </div>
                  <div style={{ background: C.surface, padding: 12, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <p style={{ margin: 0, fontSize: 11, color: C.muted }}>Detection Rate (POD)</p>
                    <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 800, color: C.green, fontFamily: "'Exo 2', sans-serif" }}>95.0%</p>
                  </div>
                  <div style={{ background: C.surface, padding: 12, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <p style={{ margin: 0, fontSize: 11, color: C.muted }}>False Alarm (FAR)</p>
                    <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 800, color: C.amber, fontFamily: "'Exo 2', sans-serif" }}>5.0%</p>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(124, 90, 245, 0.08)', border: '1px solid rgba(124, 90, 245, 0.25)',
                borderRadius: 14, padding: 20
              }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, color: '#a78bfa', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                  📐 AHP Multi-Criteria Weighting
                </p>
                <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.5 }}>
                  <strong style={{ color: C.cyan }}>0.80 Hazard</strong> + <strong style={{ color: C.amber }}>0.15 Vulnerability</strong> + <strong style={{ color: C.green }}>0.05 Exposure</strong> = <span style={{ color: '#fff', fontWeight: 700 }}>1.00 (IPCC Composite Risk)</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Research Progression Narrative: Problem -> Existing -> Our Solution */}
      <section style={{ padding: '80px 24px', background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.cyan, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              Scientific Rigor & Motivation
            </p>
            <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 40px)', margin: 0 }}>
              The Research Journey: From Problem to Current Best State
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            
            {/* Box 1: The Problem */}
            <div style={{ background: C.panel, padding: 28, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>⚠️</span>
                <h3 style={{ margin: 0, fontSize: 18, color: C.red, fontWeight: 700 }}>1. The Flaw in Global AI</h3>
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, margin: 0 }}>
                Global AI models like <strong>Google GraphCast</strong> and traditional <strong>ECMWF</strong> operate at ~25 km resolution. They smooth out the mountains, valleys, and urban drainage corridors that physically trigger extreme localized rainfall, causing catastrophic under-predictions and high false alarms.
              </p>
            </div>

            {/* Box 2: Existing Approaches */}
            <div style={{ background: C.panel, padding: 28, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🔬</span>
                <h3 style={{ margin: 0, fontSize: 18, color: C.amber, fontWeight: 700 }}>2. Multi-Source Uncertainties</h3>
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, margin: 0 }}>
                As proven by recent <strong>NIT Warangal hydrology research</strong>, traditional physics models (HEC-HMS) suffer from high parameter uncertainty due to manual guesswork, while point gauge stations create spatial blindspots compared to gridded satellite reanalysis.
              </p>
            </div>

            {/* Box 3: Our Current Best Approach */}
            <div style={{ background: C.panel, padding: 28, borderRadius: 14, border: `1px solid rgba(0,212,255,0.3)`, boxShadow: '0 0 30px rgba(0,212,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>⚡</span>
                <h3 style={{ margin: 0, fontSize: 18, color: C.green, fontWeight: 700 }}>3. RainCast Best State</h3>
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, margin: 0 }}>
                A <strong>Spatio-Temporal Hybrid U-Net + LSTM/XGBoost</strong> with TFLite quantization that directly ingests 30m SRTM DEM elevation tensors. Combined with 2D SCS-CN runoff hydrodynamics, it delivers ward-level waterlogging depth across 85 municipal wards without human parameter uncertainty.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Complete IPCC Disaster Risk Framework Section */}
      <section style={{ padding: '80px 24px', background: C.bg }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.green, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              Integrated Hydrological Physics
            </p>
            <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 40px)', margin: 0 }}>
              The Full IPCC Disaster Risk Formula
            </h2>
            <p style={{ color: C.muted, fontSize: 15, marginTop: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: C.cyan }}>Risk = Hazard (H) × Vulnerability (V) × Exposure (Exp)</span>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
            
            {/* Hazard */}
            <div style={{ background: C.surface, border: `1px solid ${C.borderBright}`, borderRadius: 14, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 18, color: C.cyan, fontWeight: 700 }}>🔴 Hazard (H)</h3>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: C.muted }}>AHP: 0.80</span>
              </div>
              <p style={{ fontSize: 13, color: '#93c5fd', fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
                H = Runoff (SCS-CN) × Wet Days × Slope
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                <li><strong>R (SCS-CN):</strong> Urban runoff with CN=88</li>
                <li><strong>W (Wet Days):</strong> Antecedent moisture saturation</li>
                <li><strong>S (Slope):</strong> 30m DEM slope gradient</li>
              </ul>
            </div>

            {/* Vulnerability */}
            <div style={{ background: C.surface, border: `1px solid ${C.borderBright}`, borderRadius: 14, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 18, color: C.amber, fontWeight: 700 }}>🟠 Vulnerability (V)</h3>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: C.muted }}>AHP: 0.15</span>
              </div>
              <p style={{ fontSize: 13, color: '#fcd34d', fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
                V = D × NDVI × NDWI × E × TPI
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                <li><strong>D:</strong> Euclidean distance to river corridor</li>
                <li><strong>E & TPI:</strong> Elevation & Topographic Position Index</li>
                <li><strong>NDVI & NDWI:</strong> Vegetation & Surface wetness</li>
              </ul>
            </div>

            {/* Exposure */}
            <div style={{ background: C.surface, border: `1px solid ${C.borderBright}`, borderRadius: 14, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 18, color: C.green, fontWeight: 700 }}>🟢 Exposure (Exp)</h3>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: C.muted }}>AHP: 0.05</span>
              </div>
              <p style={{ fontSize: 13, color: '#6ee7b7', fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
                Exp = Population Density (Census / GHSL)
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                <li><strong>Census 2011:</strong> Ward-level demographic baseline</li>
                <li><strong>GHSL (1975–2030):</strong> 5-year urbanization epochs</li>
                <li><strong>LULC Multi-Epochs:</strong> 2000–2050 impervious tracking</li>
              </ul>
            </div>

          </div>

          {/* 9 Atmospheric Parameters Tensor Highlight */}
          <div style={{
            background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24
          }}>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: C.cyan, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
              🌐 Full 9-Parameter Climate & Atmospheric Tensor
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ fontSize: 13, color: C.muted }}>1. <strong>Temperature:</strong> Tmax & Tmin (°C)</div>
              <div style={{ fontSize: 13, color: C.muted }}>2. <strong>Dew-Point:</strong> Condensation Temp (°C)</div>
              <div style={{ fontSize: 13, color: C.muted }}>3. <strong>Relative Humidity:</strong> Saturation (%)</div>
              <div style={{ fontSize: 13, color: C.muted }}>4. <strong>Shortwave Radiation:</strong> Downwelling (W/m²)</div>
              <div style={{ fontSize: 13, color: C.muted }}>5. <strong>Longwave Radiation:</strong> Thermal Infrared (W/m²)</div>
              <div style={{ fontSize: 13, color: C.muted }}>6. <strong>Wind Magnitude:</strong> √(U² + V²) (m/s)</div>
              <div style={{ fontSize: 13, color: C.muted }}>7. <strong>Wind Vectors:</strong> Zonal (U) & Meridional (V)</div>
              <div style={{ fontSize: 13, color: C.muted }}>8. <strong>Surface Pressure:</strong> Sea-level barometric (hPa)</div>
              <div style={{ fontSize: 13, color: C.muted }}>9. <strong>Geopotential Height:</strong> 500hPa synoptic trough (m)</div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', background: C.surface, textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 36, marginBottom: 16 }}>
            Ready to explore the 3-Phase operational system?
          </h2>
          <p style={{ color: C.muted, fontSize: 16, marginBottom: 32 }}>
            Switch between Phase 1 (Live Rainfall Prediction), Phase 2 (City Flood Risk for Indore's 85 Wards), and Phase 3 (India Scale Roadmap).
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '16px 36px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: `linear-gradient(135deg, ${C.cyan}, ${C.green})`,
              color: '#04080f', fontWeight: 800, fontSize: 16,
              fontFamily: "'Exo 2', sans-serif",
              boxShadow: `0 0 35px rgba(0,212,255,0.4)`,
              transition: 'all 0.2s',
            }}
          >
            Launch Main Dashboard 🚀
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '36px 24px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 16, margin: 0, marginBottom: 4 }}>
              Rain<span style={{ color: C.cyan }}>Cast</span> AI
            </p>
            <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>Physics-Hybrid Spatiotemporal Intelligence</p>
          </div>
          <p style={{ fontSize: 12, color: C.dim, margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
            B.Tech Final Year Capstone & Research Platform · 2026
          </p>
        </div>
      </footer>

    </div>
  )
}

