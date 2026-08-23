import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: 'calc(100vh - 64px)', padding: '50px 24px 80px' }}>
      
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        
        {/* Header & Mission */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'var(--teal)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            boxShadow: '0 4px 12px rgba(14, 124, 134, 0.25)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
              <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="1.75"/>
              <circle cx="12" cy="12" r="2.5" fill="#FFFFFF"/>
            </svg>
          </div>

          <h1 style={{ fontSize: 34, fontWeight: 700, margin: '0 0 12px' }}>
            About RainCast AI
          </h1>

          <p style={{ fontSize: 17, color: 'var(--ink-muted)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            An open scientific research instrument developed for Indore, pioneering physics-gated machine learning for micro-catchment monsoon rainfall prediction and IPCC urban flood risk quantification.
          </p>
        </div>

        {/* Research Core & Affiliations */}
        <div className="card-instrument" style={{ padding: 32, marginBottom: 32 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700 }}>
            Scientific Objective & Scope
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.7, margin: '0 0 16px' }}>
            RainCast AI addresses the critical spatial gap between synoptic-scale numerical weather predictions (ECMWF / IMD GFS) and localized street-level urban inundation. By solving 9-variable atmospheric dynamics and 2D SCS-CN hydrological routing together, the platform generates auditable, ward-level flood vulnerability metrics for municipal emergency planners.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}>
            <span className="stat-chip">Indore Municipal Corporation (IMC)</span>
            <span className="stat-chip">75-Year ERA5 Dataset</span>
            <span className="stat-chip">85 Municipal Wards</span>
          </div>
        </div>

        {/* Team Grid with Isohyet-Ring Blank Circle Placeholders */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 20px', textAlign: 'center' }}>
            Research Contributors & Hydrological Engineers
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            
            {[
              { role: "Machine Learning & Spatio-Temporal Models", spec: "PyTorch U-Net & Gated Pipelines" },
              { role: "Hydrological Modeling & GIS", spec: "SCS-CN Runoff & SRTM DEM Topography" },
              { role: "Climate Data Engineering", spec: "ERA5 75-Yr & CMIP6 HighResMIP Sync" }
            ].map((member, idx) => (
              <div key={idx} className="card-instrument" style={{ padding: 24, textAlign: 'center' }}>
                
                {/* Isohyet Ring Avatar Placeholder */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  background: 'var(--bg)',
                  border: '1px dashed var(--teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity={0.4}>
                    <circle cx="24" cy="24" r="20" stroke="var(--teal)" strokeWidth="1" strokeDasharray="3 3"/>
                    <circle cx="24" cy="24" r="13" stroke="var(--teal)" strokeWidth="1"/>
                    <circle cx="24" cy="24" r="5" fill="var(--teal)"/>
                  </svg>
                </div>

                <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700 }}>
                  {member.role}
                </h4>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)', fontFamily: "'IBM Plex Mono', monospace" }}>
                  {member.spec}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Contact & Open Collaboration */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700 }}>Open Collaboration & Inquiries</h4>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
              Interested in integrating municipal gauge feeds or validating against other basins?
            </p>
          </div>

          <a
            href="mailto:research@raincast.ai"
            style={{
              textDecoration: 'none',
              background: 'var(--teal)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'IBM Plex Mono', monospace"
            }}
          >
            Contact Research Team
          </a>
        </div>

      </div>

    </div>
  )
}
