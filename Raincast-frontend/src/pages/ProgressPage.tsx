import { useState } from 'react'
import { Link } from 'react-router-dom'

type FilterType = 'all' | 'architecture' | 'data' | 'validation';

interface CommitLogItem {
  version: string;
  isCurrentBest?: boolean;
  category: 'architecture' | 'data' | 'validation';
  title: string;
  date: string;
  commitHash: string;
  whatChanged: string;
  why: string;
  method: string;
  metricBeforeAfter: {
    metric: string;
    before: string;
    after: string;
    improved: boolean;
  }[];
  whatWeLearned: string;
}

export default function ProgressPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const commitLogs: CommitLogItem[] = [
    {
      version: "v0.6",
      isCurrentBest: true,
      category: "architecture",
      title: "Spatio-Temporal Residual U-Net + 2-Layer LSTM (75-Year ERA5 Pipeline)",
      date: "2026-08-23",
      commitHash: "6dffe54",
      whatChanged: "Fused 64x64 spatial NetCDF atmospheric grids with 7-day 9-parameter temporal LSTM sequences and 85-ward SCS-CN hydrological routing.",
      why: "Single tabular models missed synoptic-scale moisture advection and terrain bowl stagnation.",
      method: "PyTorch UNet_LSTM_Bias with 256-d spatial embedding + 128-d temporal hidden states + ReLU gated calibration head.",
      metricBeforeAfter: [
        { metric: "RMSE (Test)", before: "8.4 mm", after: "6.2 mm", improved: true },
        { metric: "Pearson r", before: "0.668", after: "0.760", improved: true },
        { metric: "CSI Index", before: "0.533", after: "0.615", improved: true },
        { metric: "CMIP6 Climate Match", before: "18.5%", after: "22.4%", improved: true }
      ],
      whatWeLearned: "Spatial context prevents false cloudburst alarms on days with dry upper-atmosphere profiles."
    },
    {
      version: "v0.5",
      isCurrentBest: false,
      category: "architecture",
      title: "3-Stage Gated Extreme Hybrid Pipeline",
      date: "2026-08-15",
      commitHash: "c918804",
      whatChanged: "Decoupled dry-day filtering from moderate rain and extreme (>30mm) precipitation modeling.",
      why: "Standard regression models over-predict light drizzle on overcast days and under-predict cloudbursts.",
      method: "LightGBM Stage 1 (P >= 0.35) -> XGBoost Stage 2 Extreme Classifier -> Asymmetric Heavy Rain Regressor.",
      metricBeforeAfter: [
        { metric: "False Alarm Rate", before: "45.0%", after: "28.6%", improved: true },
        { metric: "Extreme Detection POD", before: "65.0%", after: "100.0%", improved: true }
      ],
      whatWeLearned: "Extreme rainfall behaves as a distinct physical regime that requires dedicated loss penalties."
    },
    {
      version: "v0.4",
      category: "data",
      title: "Spatial U-Net NetCDF Feature Extraction & LULC Infiltration",
      date: "2026-08-01",
      commitHash: "8d44e12",
      whatChanged: "Integrated 75 years of daily NetCDF grid data and 30m SRTM DEM slope parameters.",
      why: "Point forecasts cannot account for upstream catchment runoff draining into low-lying urban wards.",
      method: "DoubleConv U-Net encoder extracting 256-dimensional spatial context vectors.",
      metricBeforeAfter: [
        { metric: "Catchment Inundation MAE", before: "12.4 mm", after: "7.8 mm", improved: true },
        { metric: "Spatial Correlation", before: "0.420", after: "0.668", improved: true }
      ],
      whatWeLearned: "Topographic Position Index (TPI) is the single highest predictor of localized waterlogging."
    },
    {
      version: "v0.3",
      category: "validation",
      title: "Physics-Augmented Random Forest with Soil Strata Constraints",
      date: "2026-07-20",
      commitHash: "72f091a",
      whatChanged: "Enforced physical soil saturation limits across 0-7cm, 7-28cm, and 28-100cm moisture bands.",
      why: "Unconstrained trees predicted flash floods even on parched, high-capacity dry soils.",
      method: "Boundary-constrained decision forest trained with SCS-CN Curve Number thresholds.",
      metricBeforeAfter: [
        { metric: "CSI Index", before: "0.380", after: "0.533", improved: true },
        { metric: "False Alarm Rate", before: "62.0%", after: "46.7%", improved: true }
      ],
      whatWeLearned: "Antecedent Moisture Condition (AMC-III) dictates whether 50mm of rain causes severe flooding or zero runoff."
    },
    {
      version: "v0.2",
      category: "architecture",
      title: "Moderated Asymmetric Loss Function Integration",
      date: "2026-07-05",
      commitHash: "b29f401",
      whatChanged: "Replaced symmetric MSE loss with asymmetric under-prediction penalties.",
      why: "MSE treats a 10mm under-prediction on a flood day equally to an over-prediction on a dry day.",
      method: "Custom Loss: Loss = alpha * (y - y_hat)^2 for under-predictions, beta * (y - y_hat)^2 for over-predictions.",
      metricBeforeAfter: [
        { metric: "Heavy Rain Recall (POD)", before: "48.0%", after: "72.7%", improved: true },
        { metric: "RMSE", before: "15.8 mm", after: "12.4 mm", improved: true }
      ],
      whatWeLearned: "Public safety in flood warning requires penalizing missed extreme events 4x more than false alarms."
    },
    {
      version: "v0.1",
      category: "data",
      title: "Baseline ERA5 75-Year Reanalysis Tabular Pipeline",
      date: "2026-06-18",
      commitHash: "0a718c7",
      whatChanged: "Compiled continuous 1950–2025 meteorological series for Indore across 9 primary parameters.",
      why: "Established the ground truth baseline across 27,375 consecutive days of historical climate.",
      method: "Standard Linear & Gradient Boosted Regression baseline models.",
      metricBeforeAfter: [
        { metric: "Baseline RMSE", before: "24.5 mm", after: "18.4 mm", improved: true }
      ],
      whatWeLearned: "Monsoon seasonality requires dedicated monthly stratification and lag feature engineering."
    }
  ];

  const filteredLogs = filter === 'all' 
    ? commitLogs 
    : commitLogs.filter(log => log.category === filter);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 80px' }}>
      
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--teal-light)', padding: '4px 12px', borderRadius: 16, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', fontFamily: "'IBM Plex Mono', monospace" }}>
              RESEARCH LOG & COMMIT TRAIL
            </span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px' }}>
            "How we got here" — Inspectable Version History
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', margin: 0, lineHeight: 1.5 }}>
            A reproducible paper trail of every architectural iteration, parameter modification, and ground-truth validation delta.
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'architecture', label: 'Model Architecture' },
            { id: 'data', label: 'Data & Features' },
            { id: 'validation', label: 'Validation & Physics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as FilterType)}
              style={{
                background: filter === tab.id ? 'var(--teal)' : 'var(--surface)',
                color: filter === tab.id ? '#FFFFFF' : 'var(--ink-muted)',
                border: filter === tab.id ? '1px solid var(--teal)' : '1px solid var(--border)',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Log Cards with Contour Connecting Lines */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Vertical Connecting Line */}
          <div style={{
            position: 'absolute',
            left: 20,
            top: 20,
            bottom: 20,
            width: 2,
            background: 'var(--border)',
            zIndex: 1
          }} />

          {filteredLogs.map((log) => {
            return (
              <div
                key={log.version}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start'
                }}
              >
                {/* Milestone Dot / Isohyet Ring Marker */}
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: log.isCurrentBest ? 'var(--teal)' : 'var(--surface)',
                  border: log.isCurrentBest ? '3px solid var(--teal-light)' : '2px solid var(--border)',
                  color: log.isCurrentBest ? '#FFFFFF' : 'var(--ink-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: log.isCurrentBest ? '0 0 0 4px rgba(14, 124, 134, 0.15)' : 'none'
                }}>
                  {log.version}
                </div>

                {/* Main Card */}
                <div
                  className="card-instrument"
                  style={{
                    flex: 1,
                    padding: 24,
                    border: log.isCurrentBest ? '2px solid var(--teal)' : '1px solid var(--border)',
                    background: 'var(--surface)'
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: 'var(--teal)' }}>
                          {log.version}
                        </span>
                        {log.isCurrentBest && (
                          <span style={{
                            background: 'var(--teal)',
                            color: '#FFFFFF',
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 4,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                          }}>
                            ★ CURRENT BEST
                          </span>
                        )}
                        <span style={{ fontSize: 11, background: 'var(--bg)', padding: '2px 8px', borderRadius: 4, color: 'var(--ink-muted)', textTransform: 'capitalize' }}>
                          {log.category}
                        </span>
                      </div>

                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
                        {log.title}
                      </h3>
                    </div>

                    <div style={{ textAlign: 'right', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--ink-muted)' }}>
                      <div>{log.date}</div>
                      <div style={{ color: 'var(--teal)', fontSize: 11 }}>[{log.commitHash}]</div>
                    </div>
                  </div>

                  {/* Schema Content: What Changed / Why / Method / What We Learned */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, fontSize: 13, color: 'var(--ink)', marginBottom: 18 }}>
                    <div style={{ background: 'var(--bg)', padding: 12, borderRadius: 8 }}>
                      <strong style={{ color: 'var(--ink-muted)', fontSize: 11, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>What Changed</strong>
                      {log.whatChanged}
                    </div>

                    <div style={{ background: 'var(--bg)', padding: 12, borderRadius: 8 }}>
                      <strong style={{ color: 'var(--ink-muted)', fontSize: 11, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>Why</strong>
                      {log.why}
                    </div>

                    <div style={{ background: 'var(--bg)', padding: 12, borderRadius: 8 }}>
                      <strong style={{ color: 'var(--ink-muted)', fontSize: 11, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>Method</strong>
                      {log.method}
                    </div>

                    <div style={{ background: 'var(--bg)', padding: 12, borderRadius: 8 }}>
                      <strong style={{ color: 'var(--ink-muted)', fontSize: 11, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>What We Learned</strong>
                      {log.whatWeLearned}
                    </div>
                  </div>

                  {/* Metric Before -> After Deltas in Measurement Mono */}
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                      Empirical Metric Delta
                    </span>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {log.metricBeforeAfter.map((m, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            padding: '6px 12px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontFamily: "'IBM Plex Mono', monospace"
                          }}
                        >
                          <span style={{ color: 'var(--ink-muted)' }}>{m.metric}: </span>
                          <span style={{ color: 'var(--ink-dim)', textDecoration: 'line-through', marginRight: 4 }}>{m.before}</span>
                          <span style={{ color: m.improved ? 'var(--risk-low)' : 'var(--ink)', fontWeight: 700 }}>
                            → {m.after}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )
          })}

        </div>

      </div>

    </div>
  )
}
