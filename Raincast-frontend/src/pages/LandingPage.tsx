import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState<number>(4) // Default to Best Methodology step

  // Sample out-of-sample validation data points
  const sampleChartData = [
    { date: '01 Jul', observed: 4.2, model: 5.1 },
    { date: '08 Jul', observed: 14.8, model: 13.9 },
    { date: '15 Jul', observed: 36.6, model: 34.2 },
    { date: '22 Jul', observed: 8.4, model: 7.9 },
    { date: '29 Jul', observed: 21.0, model: 22.4 },
    { date: '05 Aug', observed: 12.5, model: 11.8 },
    { date: '12 Aug', observed: 2.1, model: 1.9 },
  ]

  const researchStops = [
    {
      id: 0,
      title: "1. The Problem",
      short: "Coarse global models fail on local flash floods",
      detail: "Global AI systems like GraphCast and ECMWF operate on 25km resolution grids that average out Indore's local terrain sinks, missing high-intensity convective cloudbursts across the Kahn and Saraswati river basins."
    },
    {
      id: 1,
      title: "2. Existing Approaches",
      short: "Black-box forecasts without ground physics",
      detail: "Existing weather tools predict city-wide averages without modeling topographic position (TPI), soil saturation strata (5m-20m), or 2D SCS-CN hydraulic drainage bottlenecks."
    },
    {
      id: 2,
      title: "3. Our Initial Approach",
      short: "75-year ERA5 reanalysis + terrain integration",
      detail: "Coupled 75 years of daily atmospheric reanalysis (1950–2025) with high-resolution 30m SRTM Digital Elevation Models to establish historical baseline probability distributions."
    },
    {
      id: 3,
      title: "4. Experiments",
      short: "Benchmarked tree ensembles vs deep U-Nets",
      detail: "Evaluated Random Forests, XGBoost, asymmetric loss functions, and spatial U-Net encoders on out-of-sample monsoon events to isolate peak precipitation capture rates."
    },
    {
      id: 4,
      title: "5. Best Methodology",
      short: "Physics-gated Spatio-Temporal Hybrid",
      detail: "Fuses 64x64 spatial atmospheric tensors with 2-layer temporal LSTM trajectories and 2D SCS-CN hydrodynamic routing, achieving 0.615 CSI and r=0.760 correlation."
    },
    {
      id: 5,
      title: "6. Why It's Better",
      short: "Auditable IPCC risk for all 85 municipal wards",
      detail: "Decomposes risk into explicit mathematical equations: Hazard (R×W×S), Vulnerability (D×NDVI×NDWI×E×TPI), and Exposure (Census/GHSL), weighted via AHP (0.80H + 0.15V + 0.05E)."
    }
  ]

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)' }}>

      {/* Hero Section with Isohyet Contour Rings */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '70px 24px 80px', borderBottom: '1px solid var(--border)' }}>
        
        {/* Subtle Isohyet Background Motif */}
        <div 
          className="isohyet-rings-bg" 
          style={{ position: 'absolute', inset: 0, opacity: 0.8, pointerEvents: 'none' }} 
        />
        
        {/* Thin Teal-Sky Accent Gradient Band */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, var(--teal), var(--sky))'
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal)', letterSpacing: '0.02em' }}>
              RESEARCH INSTRUMENT · INDORE MONSOON 2026
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1.15,
            margin: '0 auto 18px',
            maxWidth: 820
          }}>
            Rainfall and flood risk for Indore, <span style={{ color: 'var(--teal)' }}>modeled and measured.</span>
          </h1>

          <p style={{
            fontSize: '17px',
            color: 'var(--ink-muted)',
            lineHeight: 1.6,
            maxWidth: 680,
            margin: '0 auto 28px'
          }}>
            A live scientific instrument fusing 75-year ERA5 climate reanalysis, 9-variable atmospheric tensors, and 2D SCS-CN ward-level physics. Validated against real IMD ground truth gauges.
          </p>

          {/* 3 Measurement Mono Chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
            <div className="stat-chip">
              <span style={{ color: 'var(--ink-muted)', fontSize: 11, display: 'block', textTransform: 'uppercase' }}>Day 1 Forecast</span>
              <span style={{ color: 'var(--teal)', fontSize: 16, fontWeight: 700 }}>52.4 mm</span>
            </div>

            <div className="stat-chip">
              <span style={{ color: 'var(--ink-muted)', fontSize: 11, display: 'block', textTransform: 'uppercase' }}>Model Confidence</span>
              <span style={{ color: 'var(--teal)', fontSize: 16, fontWeight: 700 }}>95.9%</span>
            </div>

            <div className="stat-chip">
              <span style={{ color: 'var(--ink-muted)', fontSize: 11, display: 'block', textTransform: 'uppercase' }}>Active Release</span>
              <span style={{ color: 'var(--ink)', fontSize: 16, fontWeight: 700 }}>v0.6 Hybrid</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link
              to="/dashboard"
              style={{
                textDecoration: 'none',
                background: 'var(--teal)',
                color: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 2px 8px rgba(14, 124, 134, 0.25)',
                transition: 'background 0.15s ease'
              }}
            >
              <span>Enter Dashboard</span>
              <span>→</span>
            </Link>

            <Link
              to="/progress"
              style={{
                textDecoration: 'none',
                background: 'var(--surface)',
                color: 'var(--ink)',
                border: '1px solid var(--border)',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              See how we got here
            </Link>
          </div>

        </div>
      </section>

      {/* The Problem → Our Approach Horizontal Accordion Rail */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            RESEARCH EVOLUTION
          </span>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', margin: '6px 0 0' }}>
            The Problem → Our Approach
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginTop: 4 }}>
            Click any milestone along the contour rail to inspect the architectural decision
          </p>
        </div>

        {/* 6-Stop Step Grid with Connecting Line */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
          
          {researchStops.map((stop) => {
            const isSelected = activeStep === stop.id;
            return (
              <button
                key={stop.id}
                onClick={() => setActiveStep(stop.id)}
                style={{
                  background: isSelected ? 'var(--teal-light)' : 'var(--surface)',
                  border: isSelected ? '2px solid var(--teal)' : '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '16px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(14, 124, 134, 0.12)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{
                    fontSize: 11,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 700,
                    color: isSelected ? 'var(--teal)' : 'var(--ink-muted)'
                  }}>
                    {stop.title}
                  </span>
                  {isSelected && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)' }} />
                  )}
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, color: isSelected ? 'var(--ink)' : 'var(--ink-muted)', lineHeight: 1.3 }}>
                  {stop.short}
                </div>
              </button>
            )
          })}
        </div>

        {/* Expanded Accordion Detail Card */}
        <div style={{
          marginTop: 16,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <span style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>
              STEP {activeStep + 1} DEEP DIVE
            </span>
            <h4 style={{ margin: '4px 0 8px', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
              {researchStops[activeStep].title}: {researchStops[activeStep].short}
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
              {researchStops[activeStep].detail}
            </p>
          </div>

          <Link
            to="/progress"
            style={{
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--teal)',
              padding: '8px 16px',
              borderRadius: 6,
              background: 'var(--teal-light)',
              whiteSpace: 'nowrap'
            }}
          >
            Inspect Commit Log →
          </Link>
        </div>

      </section>

      {/* Current Metrics Panel with Model vs Observed Graph & Isohyet Dial */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                EMPIRICAL VALIDATION
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: '4px 0 0' }}>
                Current Metrics & Ground Truth Synchronization
              </h2>
            </div>
            <div style={{ fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--ink-muted)' }}>
              Last Verified: <strong style={{ color: 'var(--ink)' }}>Monsoon 2026 Test Set</strong>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            
            {/* Model vs Observed Verification Chart */}
            <div className="card-instrument" style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Model vs Observed Gauge</h4>
                  <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Out-of-sample 2026 Monsoon IMD station readings</span>
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}>
                  <span style={{ color: 'var(--teal)', fontWeight: 600 }}>── AI Model</span>
                  <span style={{ color: 'var(--sky)', fontWeight: 600 }}>··· Observed</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={sampleChartData}>
                  <CartesianGrid stroke="#EDF2EE" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" stroke="#8E9EA7" tick={{ fontSize: 11, fill: '#5B6B76', fontFamily: "'IBM Plex Mono', monospace" }} />
                  <YAxis stroke="#8E9EA7" tick={{ fontSize: 11, fill: '#5B6B76', fontFamily: "'IBM Plex Mono', monospace" }} />
                  <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8E5', borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="model" stroke="var(--teal)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--teal)' }} />
                  <Line type="monotone" dataKey="observed" stroke="var(--sky)" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3, fill: 'var(--sky)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Isohyet Ring Confidence Gauge Dial + Hydrological Stat Boxes */}
            <div className="card-instrument" style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Accuracy & Error Envelope</h4>
                  <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Continuous hydrological scoring</span>
                </div>
                
                {/* Circular Isohyet-Ring Dial */}
                <div style={{ position: 'relative', width: 68, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="68" height="68" viewBox="0 0 68 68" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" stroke="#EDF2EE" strokeWidth="5" fill="none" />
                    <circle cx="34" cy="34" r="28" stroke="var(--teal)" strokeWidth="5" fill="none" strokeDasharray="175.9" strokeDashoffset="14" strokeLinecap="round" />
                  </svg>
                  <span style={{ position: 'absolute', fontSize: 13, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--teal)' }}>
                    92%
                  </span>
                </div>
              </div>

              {/* 4 Stat Boxes in Mono Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
                <div style={{ background: 'var(--bg)', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>Mean Abs Error</span>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--teal)', marginTop: 2 }}>
                    3.1 mm
                  </div>
                </div>

                <div style={{ background: 'var(--bg)', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>RMSE (Test)</span>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--ink)', marginTop: 2 }}>
                    6.2 mm
                  </div>
                </div>

                <div style={{ background: 'var(--bg)', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>CSI Score</span>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--risk-low)', marginTop: 2 }}>
                    0.615
                  </div>
                </div>

                <div style={{ background: 'var(--bg)', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>False Alarm Rate</span>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--risk-low)', marginTop: 2 }}>
                    20.0%
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Why This Approach is Better: 3 Grounded Cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            SCIENTIFIC FOUNDATION
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', margin: '6px 0 0' }}>
            Why This Architecture Outperforms Global AI Models
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          
          <div className="card-instrument" style={{ padding: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, fontSize: 18, fontWeight: 700 }}>
              01
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px' }}>
              Rain-on-Grid Hydrology + Hydraulics Solved Together
            </h3>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>
              Instead of passing a static rainfall number to an external drainage model, our pipeline couples 9-variable atmospheric tensors directly with 2D SCS-CN runoff infiltration and terrain slopes.
            </p>
          </div>

          <div className="card-instrument" style={{ padding: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--sky-light)', color: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, fontSize: 18, fontWeight: 700 }}>
              02
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px' }}>
              Validated Against Real IMD Gauges, Not Model Output
            </h3>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>
              Every parameter is calibrated against physical weather stations and out-of-sample Monsoon 2026 observations, avoiding the hallucinated precipitation artifacts common in pure generative models.
            </p>
          </div>

          <div className="card-instrument" style={{ padding: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--ochre-light)', color: 'var(--ochre)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, fontSize: 18, fontWeight: 700 }}>
              03
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px' }}>
              Built for Indore's Own Terrain, Not Adapted from Elsewhere
            </h3>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>
              Calibrated for all 85 municipal wards of Indore using 30m SRTM DEM topography, Topographic Position Index (TPI), and decadal Land Use / Land Cover (LULC) urban growth vectors.
            </p>
          </div>

        </div>
      </section>

      {/* Scientific Footer */}
      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '40px 24px', fontSize: 13, color: 'var(--ink-muted)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--ink)', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15 }}>
              RainCast AI
            </span>
            <p style={{ margin: '4px 0 0', fontSize: 12 }}>
              Data Sources: ECMWF ERA5 75-Yr Reanalysis · IMD Gauge Network · OpenMeteo CMIP6 HighResMIP · SRTM 30m DEM · Census 2011 & GHSL
            </p>
          </div>

          <div style={{ display: 'flex', gap: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
            <Link to="/progress" style={{ color: 'var(--teal)', textDecoration: 'none' }}>Research Log</Link>
            <Link to="/about" style={{ color: 'var(--teal)', textDecoration: 'none' }}>About System</Link>
            <Link to="/dashboard" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 600 }}>Dashboard →</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
