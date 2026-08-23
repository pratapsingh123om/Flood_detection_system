import React from 'react'
import { useNavigate } from 'react-router-dom'

const C = {
  cyan: '#00d4ff',
  green: '#06ffa5',
  bg: '#04080f',
  surface: '#080f1c',
  panel: '#0c1525',
  border: '#1a2d4a',
  text: '#e2eaf5',
  muted: '#6b8ab0',
}

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '88vh', padding: '60px 24px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 14px', borderRadius: 20,
          background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)',
          fontSize: 12, fontWeight: 600, color: C.cyan,
          fontFamily: "'JetBrains Mono', monospace", marginBottom: 24
        }}>
          👥 ABOUT US · PROJECT RAINCAST AI
        </div>

        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 800,
          marginBottom: 20,
          background: `linear-gradient(135deg, ${C.text}, ${C.muted})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Research & Engineering Team
        </h1>

        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, marginBottom: 40 }}>
          RainCast AI is developed as an academic and technological initiative exploring Physics-Hybrid Spatiotemporal Deep Learning for extreme rainfall forecasting and urban flood risk inundation mapping.
        </p>

        <div style={{
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: '40px 24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          marginBottom: 36
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏛️</div>
          <h3 style={{ margin: '0 0 8px', fontSize: 18, color: C.cyan, fontWeight: 700 }}>
            Academic B.Tech Capstone & Research Initiative
          </h3>
          <p style={{ color: C.muted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Combining 75 years of ERA5 reanalysis data, 30m SRTM topographical elevation models, and the IPCC Disaster Risk Framework to protect urban catchments against extreme precipitation hazards.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px', borderRadius: 8,
              background: 'transparent', border: `1px solid ${C.border}`,
              color: C.text, fontSize: 13, fontWeight: 600, cursor: 'pointer'
            }}
          >
            ← Back to Landing
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '10px 24px', borderRadius: 8,
              background: `linear-gradient(135deg, ${C.cyan}, ${C.green})`,
              border: 'none', color: '#04080f', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 0 20px rgba(0,212,255,0.25)'
            }}
          >
            Launch Dashboard →
          </button>
        </div>
      </div>
    </div>
  )
}
