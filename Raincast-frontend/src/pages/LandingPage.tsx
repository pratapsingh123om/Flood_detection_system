import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      title: "Collect the source data",
      desc: "Obtain IMD rainfall and temperature, CHIRPS rainfall, NASA rainfall and land-surface products, and the auxiliary meteorological variables available to the project."
    },
    {
      title: "Audit the downloads",
      desc: "Check date coverage, file readability, duplicates, missing observations, units, coordinates, and product versions."
    },
    {
      title: "Align space and time",
      desc: "Reconcile grid coordinates, masks, rainfall accumulation windows, and date labels before pairing products."
    },
    {
      title: "Prepare supervised examples",
      desc: "Use native IMD rainfall as the coarse magnitude and CHIRPS as the spatial-pattern reference."
    },
    {
      title: "Downscale with Stacked SRCNN",
      desc: "Refine an interpolated rainfall field through stacked convolutional stages."
    },
    {
      title: "Conserve the IMD magnitude",
      desc: "Apply a differentiable constraint so the area-weighted mean of each nested 5×5 child block matches its IMD parent."
    },
    {
      title: "Evaluate the finer estimates",
      desc: "Compare with conservative interpolation baselines and held-out reference data; use IMERG as an external product comparison."
    },
    {
      title: "Build forecasting sequences",
      desc: "Assemble recent rainfall and eligible atmospheric and surface variables, using only information available at the forecast issue time."
    },
    {
      title: "Train and evaluate seven-day forecasts",
      desc: "Predict Day 1 through Day 7 and measure performance separately at each lead time."
    },
    {
      title: "Serve the location forecast",
      desc: "Publish versioned model outputs through the API and display them on the dashboard with issue time, coverage, and evaluation context."
    }
  ]

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '90px 24px 80px', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, var(--teal), var(--sky))'
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.15, margin: '0 auto 18px', maxWidth: 820 }}>
            Explore the next seven days of rainfall across <span style={{ color: 'var(--teal)' }}>India.</span>
          </h1>

          <p style={{ fontSize: '18px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 680, margin: '0 auto 36px' }}>
            Select a place or coordinates to explore rainfall estimates and the model evaluation behind them.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/dashboard" style={{
              textDecoration: 'none', background: 'var(--teal)', color: '#FFFFFF', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(14, 124, 134, 0.25)', transition: 'background 0.15s ease'
            }}>
              Open rainfall dashboard →
            </Link>
            <a href="#methodology" style={{
              textDecoration: 'none', background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--border)', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, transition: 'all 0.15s ease'
            }}>
              Explore the methodology
            </a>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>METHODOLOGY</span>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 0' }}>How it works, step by step</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 17, color: 'var(--teal)' }}>{idx + 1}. {step.title}</h3>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--ink-muted)' }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/dashboard" style={{
            textDecoration: 'none', background: 'var(--teal-light)', color: 'var(--teal)', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'inline-block'
          }}>
            Open dashboard
          </Link>
        </div>
      </section>

      {/* Research and Transparency */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Research and Transparency</h2>
          <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 24 }}>
            It is crucial to distinguish between <strong>observations</strong>, <strong>reanalysis</strong>, <strong>downscaled estimates</strong>, and <strong>forecasts</strong>. Our predictions are built transparently so you understand exactly where the data comes from.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/performance" style={{ textDecoration: 'none', color: 'var(--teal)', fontWeight: 600 }}>Review Model Performance →</Link>
            <Link to="/data" style={{ textDecoration: 'none', color: 'var(--teal)', fontWeight: 600 }}>Source Documentation →</Link>
          </div>
          <div style={{ marginTop: 40, padding: 20, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)', display: 'inline-block' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--teal)' }}>✓ Integrated Flood-Risk Prediction</span>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', margin: '8px 0 0' }}>Our system now fully integrates rainfall forecasts with antecedent soil moisture, terrain, and hydrological response to provide actionable flood-risk alerts across India.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
