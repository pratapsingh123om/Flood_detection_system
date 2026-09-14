export default function DataPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh', padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--teal)', marginBottom: 24 }}>About the Data</h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
          Document source provenance, product version, native grid, temporal frequency, local coverage, units, missing periods, and transformations. Availability is product-specific; all variables must not be presented as available throughout 1951–2025.
        </p>

        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Source Provenance</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: 12 }}>Source or variable group</th>
                <th style={{ padding: 12 }}>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12, fontWeight: 600 }}>IMD rainfall</td>
                <td style={{ padding: 12 }}>Coarse rainfall magnitude, historical rainfall input, and a reference source</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12, fontWeight: 600 }}>IMD Tmax and Tmin</td>
                <td style={{ padding: 12 }}>Temperature context for forecasting experiments</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12, fontWeight: 600 }}>CHIRPS</td>
                <td style={{ padding: 12 }}>Spatial-pattern supervision and held-out reference-product comparison</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12, fontWeight: 600 }}>NASA IMERG</td>
                <td style={{ padding: 12 }}>External rainfall-product comparison</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12, fontWeight: 600 }}>SRTM</td>
                <td style={{ padding: 12 }}>Elevation and derived terrain information</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12, fontWeight: 600 }}>ERA5 / ERA5-Land</td>
                <td style={{ padding: 12 }}>Candidate humidity, dewpoint, wind, pressure, radiation, soil-moisture, and evaporation inputs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
