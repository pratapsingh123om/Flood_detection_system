import React, { useState } from 'react';
import { WardFloodRisk } from '../api';

interface WardMapContainerProps {
  wardRisks: WardFloodRisk[];
  onSelectWard?: (ward: WardFloodRisk) => void;
}

export const WardMapContainer: React.FC<WardMapContainerProps> = ({ wardRisks, onSelectWard }) => {
  const [selectedWard, setSelectedWard] = useState<WardFloodRisk | null>(wardRisks[0] || null);
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'HIGH' | 'MODERATE' | 'LOW'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWards = wardRisks.filter((w) => {
    const matchesFilter = riskFilter === 'ALL' || w.risk_level === riskFilter;
    const matchesSearch = w.ward_name.toLowerCase().includes(searchTerm.toLowerCase()) || w.ward_id.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const highRiskCount = wardRisks.filter((w) => w.risk_level === 'HIGH').length;
  const modRiskCount = wardRisks.filter((w) => w.risk_level === 'MODERATE').length;
  const lowRiskCount = wardRisks.filter((w) => w.risk_level === 'LOW').length;

  const handleWardClick = (ward: WardFloodRisk) => {
    setSelectedWard(ward);
    if (onSelectWard) onSelectWard(ward);
  };

  const getRiskColor = (level: string) => {
    if (level === 'HIGH') return 'var(--risk-high)';
    if (level === 'MODERATE') return 'var(--risk-med)';
    return 'var(--risk-low)';
  };

  const getRiskBg = (level: string) => {
    if (level === 'HIGH') return 'var(--risk-high-light)';
    if (level === 'MODERATE') return 'var(--risk-med-light)';
    return 'var(--risk-low-light)';
  };

  return (
    <div className="card-instrument" style={{ padding: 24 }}>
      
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
              Indore Municipal 85-Ward Flood Risk Atlas
            </h3>
            <span style={{ fontSize: 11, background: 'var(--teal-light)', color: 'var(--teal)', padding: '2px 8px', borderRadius: 6, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>
              AHP: 0.80H + 0.15V + 0.05E
            </span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
            Calculated via 30m SRTM DEM · SCS-CN Hydrodynamics · TPI Topography · River Proximity
          </span>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button
            onClick={() => setRiskFilter('ALL')}
            style={{
              background: riskFilter === 'ALL' ? 'var(--ink)' : 'var(--bg)',
              color: riskFilter === 'ALL' ? '#FFFFFF' : 'var(--ink-muted)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '5px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            All (85)
          </button>

          <button
            onClick={() => setRiskFilter('HIGH')}
            style={{
              background: riskFilter === 'HIGH' ? 'var(--risk-high)' : 'var(--risk-high-light)',
              color: riskFilter === 'HIGH' ? '#FFFFFF' : 'var(--risk-high)',
              border: '1px solid var(--risk-high)',
              borderRadius: 6,
              padding: '5px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            High ({highRiskCount})
          </button>

          <button
            onClick={() => setRiskFilter('MODERATE')}
            style={{
              background: riskFilter === 'MODERATE' ? 'var(--risk-med)' : 'var(--risk-med-light)',
              color: riskFilter === 'MODERATE' ? '#FFFFFF' : 'var(--risk-med)',
              border: '1px solid var(--risk-med)',
              borderRadius: 6,
              padding: '5px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Med ({modRiskCount})
          </button>

          <button
            onClick={() => setRiskFilter('LOW')}
            style={{
              background: riskFilter === 'LOW' ? 'var(--risk-low)' : 'var(--risk-low-light)',
              color: riskFilter === 'LOW' ? '#FFFFFF' : 'var(--risk-low)',
              border: '1px solid var(--risk-low)',
              borderRadius: 6,
              padding: '5px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Low ({lowRiskCount})
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Ward Matrix on Left + Explicit Equation Side Drawer on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.3fr) minmax(320px, 1fr)', gap: 20 }}>
        
        {/* Left Column: 85-Ward Grid Matrix */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>
              Select Ward ({filteredWards.length} Displayed)
            </span>
            <input
              type="text"
              placeholder="Search Ward..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 12,
                color: 'var(--ink)',
                outline: 'none',
                width: 150
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 8,
            maxHeight: 460,
            overflowY: 'auto',
            paddingRight: 4
          }}>
            {filteredWards.map((w) => {
              const isSelected = selectedWard?.ward_id === w.ward_id;
              const color = getRiskColor(w.risk_level);
              return (
                <button
                  key={w.ward_id}
                  onClick={() => handleWardClick(w)}
                  style={{
                    background: isSelected ? 'var(--teal-light)' : 'var(--surface)',
                    border: isSelected ? '2px solid var(--teal)' : '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '10px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(14, 124, 134, 0.15)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: 'var(--ink-muted)' }}>
                      W-{w.ward_id}
                    </span>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: color
                    }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {w.ward_name}
                  </div>
                  <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: color, fontWeight: 700, marginTop: 2 }}>
                    {(w.risk_score * 100).toFixed(0)}% Risk
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: EXPLICIT MATHEMATICAL EQUATION SIDE DRAWER */}
        {selectedWard && (
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            
            {/* Header: Ward Title & Risk Badge */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--teal)', fontWeight: 700 }}>
                    WARD #{selectedWard.ward_id} AUDIT PANEL
                  </span>
                  <h4 style={{ margin: '2px 0 0', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
                    {selectedWard.ward_name}
                  </h4>
                </div>

                <div style={{
                  background: getRiskBg(selectedWard.risk_level),
                  color: getRiskColor(selectedWard.risk_level),
                  border: `1px solid ${getRiskColor(selectedWard.risk_level)}`,
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "'IBM Plex Mono', monospace"
                }}>
                  {selectedWard.risk_level} RISK
                </div>
              </div>

              {/* The Core Mathematical Decomposition Box */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '14px 16px',
                marginBottom: 16,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                lineHeight: 1.6
              }}>
                <div style={{ color: 'var(--ink-muted)', fontSize: 10, textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                  IPCC AHP Mathematical Decomposition
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4, marginBottom: 4 }}>
                  <span>Hazard (H = R × W × S):</span>
                  <strong style={{ color: 'var(--ink)' }}>{selectedWard.hazard_score.toFixed(3)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4, marginBottom: 4 }}>
                  <span>Vulnerability (V = D×NDVI×NDWI×E×TPI):</span>
                  <strong style={{ color: 'var(--ink)' }}>{selectedWard.vulnerability_score.toFixed(3)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4, marginBottom: 4 }}>
                  <span>Exposure (E = Pop):</span>
                  <strong style={{ color: 'var(--ink)' }}>{selectedWard.exposure_score.toFixed(3)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4, color: getRiskColor(selectedWard.risk_level), fontWeight: 700, fontSize: 13 }}>
                  <span>Total Risk (0.80H + 0.15V + 0.05E):</span>
                  <span>{(selectedWard.risk_score * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Contributing Factor Mini Bar Indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                  Contributing Physical Indicators
                </span>

                {/* Factor 1: Rainfall Runoff */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>
                    <span>Runoff Inundation</span>
                    <strong>{selectedWard.inundation_depth_cm.toFixed(1)} cm</strong>
                  </div>
                  <div style={{ height: 6, background: '#E2E8E5', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, selectedWard.inundation_depth_cm * 2.5)}%`, height: '100%', background: 'var(--teal)' }} />
                  </div>
                </div>

                {/* Factor 2: Elevation & Slope */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>
                    <span>Elevation (SRTM DEM)</span>
                    <strong>{selectedWard.elevation_m.toFixed(0)} m</strong>
                  </div>
                  <div style={{ height: 6, background: '#E2E8E5', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (selectedWard.elevation_m - 500) * 1.5)}%`, height: '100%', background: 'var(--sky)' }} />
                  </div>
                </div>

                {/* Factor 3: Distance to River */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>
                    <span>Distance to Water Body</span>
                    <strong>{selectedWard.distance_to_water_m.toFixed(0)} m</strong>
                  </div>
                  <div style={{ height: 6, background: '#E2E8E5', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(10, 100 - selectedWard.distance_to_water_m / 25)}%`, height: '100%', background: 'var(--ochre)' }} />
                  </div>
                </div>

                {/* Factor 4: Population Density */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>
                    <span>Population Density</span>
                    <strong>{selectedWard.population.toLocaleString()}</strong>
                  </div>
                  <div style={{ height: 6, background: '#E2E8E5', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, selectedWard.population / 600)}%`, height: '100%', background: 'var(--ink-muted)' }} />
                  </div>
                </div>
              </div>

            </div>

            {/* Action Recommendations */}
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--ink-muted)' }}>
              <strong>Mitigation Note:</strong> {selectedWard.action_recommendation || 'Maintain municipal storm drain clearance along low-elevation arterial bottlenecks.'}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
