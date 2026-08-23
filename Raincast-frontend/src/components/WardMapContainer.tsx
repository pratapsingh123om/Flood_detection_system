import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { WardFloodRisk } from '../api';

interface WardMapContainerProps {
  wardRisks: WardFloodRisk[];
  onSelectWard?: (ward: WardFloodRisk) => void;
}

function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, 12.5);
  }, [center, map]);
  return null;
}

export const WardMapContainer: React.FC<WardMapContainerProps> = ({ wardRisks, onSelectWard }) => {
  const [selectedWard, setSelectedWard] = useState<WardFloodRisk | null>(wardRisks[0] || null);
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'HIGH' | 'MODERATE' | 'LOW'>('ALL');
  const [viewMode, setViewMode] = useState<'MAP' | 'GRID'>('MAP');
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
    if (level === 'HIGH') return '#D9553B';
    if (level === 'MODERATE') return '#E0A73A';
    return '#3FA66D';
  };

  const getRiskBg = (level: string) => {
    if (level === 'HIGH') return 'var(--risk-high-light)';
    if (level === 'MODERATE') return 'var(--risk-med-light)';
    return 'var(--risk-low-light)';
  };

  return (
    <div className="card-instrument" style={{ padding: 24 }}>
      
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
              Indore Municipal 85-Ward GIS Flood Atlas
            </h3>
            <span style={{ fontSize: 11, background: 'var(--teal-light)', color: 'var(--teal)', padding: '2px 8px', borderRadius: 6, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>
              AHP: 0.80H + 0.15V + 0.05E
            </span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
            Coupled 30m SRTM DEM · SCS-CN Inundation · TPI Topography · River Proximity
          </span>
        </div>

        {/* View Switcher & Risk Filter Pills */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Map vs Grid View Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg)', padding: 2, borderRadius: 6, border: '1px solid var(--border)' }}>
            <button
              onClick={() => setViewMode('MAP')}
              style={{
                background: viewMode === 'MAP' ? 'var(--teal)' : 'transparent',
                color: viewMode === 'MAP' ? '#FFFFFF' : 'var(--ink-muted)',
                border: 'none',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🗺️ GIS Map
            </button>
            <button
              onClick={() => setViewMode('GRID')}
              style={{
                background: viewMode === 'GRID' ? 'var(--teal)' : 'transparent',
                color: viewMode === 'GRID' ? '#FFFFFF' : 'var(--ink-muted)',
                border: 'none',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📊 Ward Grid
            </button>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={() => setRiskFilter('ALL')}
              style={{
                background: riskFilter === 'ALL' ? 'var(--ink)' : 'var(--bg)',
                color: riskFilter === 'ALL' ? '#FFFFFF' : 'var(--ink-muted)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '4px 8px',
                fontSize: 11,
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
                padding: '4px 8px',
                fontSize: 11,
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
                padding: '4px 8px',
                fontSize: 11,
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
                padding: '4px 8px',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Low ({lowRiskCount})
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid: Interactive GIS Map / Grid on Left + Equation Side Drawer on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(320px, 1fr)', gap: 20 }}>
        
        {/* Left Column: Leaflet GIS Map or 85-Ward Grid Matrix */}
        <div style={{ minHeight: 460, display: 'flex', flexDirection: 'column' }}>
          
          {viewMode === 'MAP' ? (
            <div style={{ height: 460, width: '100%', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <MapContainer
                center={[22.7196, 75.8577]}
                zoom={12.5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <MapRecenter center={[22.7196, 75.8577]} />
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                
                {filteredWards.map((w) => {
                  const isSelected = selectedWard?.ward_id === w.ward_id;
                  const color = getRiskColor(w.risk_level);
                  return (
                    <CircleMarker
                      key={w.ward_id}
                      center={[w.latitude, w.longitude]}
                      radius={isSelected ? 10 : 7}
                      pathOptions={{
                        color: isSelected ? '#16232E' : color,
                        fillColor: color,
                        fillOpacity: isSelected ? 0.95 : 0.75,
                        weight: isSelected ? 3 : 1.5
                      }}
                      eventHandlers={{
                        click: () => handleWardClick(w)
                      }}
                    >
                      <Popup>
                        <div style={{ padding: 4, fontFamily: "'Inter', sans-serif" }}>
                          <strong style={{ fontSize: 13, color: '#16232E', display: 'block' }}>
                            W-{w.ward_id}: {w.ward_name}
                          </strong>
                          <div style={{ fontSize: 11, color: color, fontWeight: 700, marginTop: 2 }}>
                            {w.risk_level} RISK ({(w.risk_score * 100).toFixed(0)}%)
                          </div>
                          <div style={{ fontSize: 11, color: '#5B6B76', marginTop: 2 }}>
                            Inundation: {w.inundation_depth_cm.toFixed(1)} cm
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>
                  {filteredWards.length} Wards Listed
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
                    width: 140
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: 8,
                maxHeight: 420,
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
                        padding: '10px',
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
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {w.ward_name}
                      </div>
                      <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: color, fontWeight: 700, marginTop: 2 }}>
                        {(w.risk_score * 100).toFixed(0)}% Risk
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: EXPLICIT MATHEMATICAL EQUATION AUDIT SIDE DRAWER */}
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
