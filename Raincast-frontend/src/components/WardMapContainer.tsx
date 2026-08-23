import React, { useState } from 'react';
import { WardFloodRisk } from '../api';

interface WardMapContainerProps {
  wardRisks: WardFloodRisk[];
  onSelectWard?: (ward: WardFloodRisk) => void;
}

export const WardMapContainer: React.FC<WardMapContainerProps> = ({ wardRisks, onSelectWard }) => {
  const [selectedWard, setSelectedWard] = useState<WardFloodRisk | null>(wardRisks[0] || null);
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'HIGH' | 'MODERATE' | 'LOW'>('ALL');
  const [metricView, setMetricView] = useState<'IPCC_RISK' | 'HAZARD' | 'VULNERABILITY' | 'EXPOSURE'>('IPCC_RISK');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWards = wardRisks.filter((w) => {
    const matchesFilter = riskFilter === 'ALL' || w.risk_level === riskFilter;
    const matchesSearch = w.ward_name.toLowerCase().includes(searchTerm.toLowerCase()) || w.ward_id.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const highRiskCount = wardRisks.filter((w) => w.risk_level === 'HIGH').length;
  const modRiskCount = wardRisks.filter((w) => w.risk_level === 'MODERATE').length;
  const lowRiskCount = wardRisks.filter((w) => w.risk_level === 'LOW').length;

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.9)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      padding: '22px',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      color: '#f8fafc'
    }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, background: 'linear-gradient(135deg, #00d4ff, #06ffa5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              🗺️ Indore Municipal 85-Ward IPCC Flood Hazard & Risk Engine
            </h3>
            <span style={{ fontSize: '10px', background: 'rgba(124, 90, 245, 0.2)', border: '1px solid rgba(124, 90, 245, 0.4)', color: '#c4b5fd', padding: '2px 8px', borderRadius: '12px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
              AHP: 0.80H + 0.15V + 0.05E
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            Calculated via 30m SRTM DEM · SCS-CN Hydrodynamics · TPI Topography · Euclidean River Distance
          </span>
        </div>

        {/* Stoplight Summary Counters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setRiskFilter('HIGH')}
            style={{
              background: riskFilter === 'HIGH' ? '#ef4444' : 'rgba(239, 68, 68, 0.15)',
              color: riskFilter === 'HIGH' ? '#fff' : '#fca5a5',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🔴 High ({highRiskCount})
          </button>

          <button
            onClick={() => setRiskFilter('MODERATE')}
            style={{
              background: riskFilter === 'MODERATE' ? '#f59e0b' : 'rgba(245, 158, 11, 0.15)',
              color: riskFilter === 'MODERATE' ? '#fff' : '#fcd34d',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🟠 Mod ({modRiskCount})
          </button>

          <button
            onClick={() => setRiskFilter('LOW')}
            style={{
              background: riskFilter === 'LOW' ? '#10b981' : 'rgba(16, 185, 129, 0.15)',
              color: riskFilter === 'LOW' ? '#fff' : '#6ee7b7',
              border: '1px solid #10b981',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🟢 Low ({lowRiskCount})
          </button>

          <button
            onClick={() => setRiskFilter('ALL')}
            style={{
              background: riskFilter === 'ALL' ? '#3b82f6' : 'rgba(59, 130, 246, 0.15)',
              color: riskFilter === 'ALL' ? '#fff' : '#93c5fd',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            All (85)
          </button>
        </div>
      </div>

      {/* Layer View Switcher & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, background: 'rgba(30, 41, 59, 0.6)', padding: 3, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setMetricView('IPCC_RISK')}
            style={{
              background: metricView === 'IPCC_RISK' ? 'linear-gradient(135deg, #00d4ff, #0284c7)' : 'transparent',
              color: metricView === 'IPCC_RISK' ? '#04080f' : '#94a3b8',
              border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
            }}
          >
            ⚖️ IPCC Risk
          </button>
          <button
            onClick={() => setMetricView('HAZARD')}
            style={{
              background: metricView === 'HAZARD' ? '#ef4444' : 'transparent',
              color: metricView === 'HAZARD' ? '#fff' : '#94a3b8',
              border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
            }}
          >
            🌧️ Hazard (H)
          </button>
          <button
            onClick={() => setMetricView('VULNERABILITY')}
            style={{
              background: metricView === 'VULNERABILITY' ? '#f59e0b' : 'transparent',
              color: metricView === 'VULNERABILITY' ? '#000' : '#94a3b8',
              border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
            }}
          >
            ⛰️ Vulnerability (V)
          </button>
          <button
            onClick={() => setMetricView('EXPOSURE')}
            style={{
              background: metricView === 'EXPOSURE' ? '#10b981' : 'transparent',
              color: metricView === 'EXPOSURE' ? '#000' : '#94a3b8',
              border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
            }}
          >
            👥 Exposure (Exp)
          </button>
        </div>

        <input
          type="text"
          placeholder="🔍 Search ward by name or #..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '6px 12px',
            background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px', color: '#fff', fontSize: '12px', outline: 'none'
          }}
        />
      </div>

      {/* Grid Matrix Visualization */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '8px',
        maxHeight: '260px',
        overflowY: 'auto',
        paddingRight: '4px'
      }}>
        {filteredWards.map((w) => {
          const isSelected = selectedWard?.ward_id === w.ward_id;
          
          let displayVal = `${w.water_depth_cm} cm`;
          let displayLabel = 'Depth';
          if (metricView === 'IPCC_RISK') {
            displayVal = `${w.ipcc_risk_score}`;
            displayLabel = 'IPCC Risk';
          } else if (metricView === 'HAZARD') {
            displayVal = `${w.hazard_score}`;
            displayLabel = 'Hazard';
          } else if (metricView === 'VULNERABILITY') {
            displayVal = `${w.vulnerability_score}`;
            displayLabel = 'Vuln';
          } else if (metricView === 'EXPOSURE') {
            displayVal = `${(w.population_density / 1000).toFixed(1)}k/km²`;
            displayLabel = 'Pop Dens';
          }

          return (
            <div
              key={w.ward_id}
              onClick={() => {
                setSelectedWard(w);
                if (onSelectWard) onSelectWard(w);
              }}
              style={{
                background: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                border: `2px solid ${w.color_hex}`,
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                boxShadow: isSelected ? `0 0 12px ${w.color_hex}` : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: w.color_hex }}>#{w.ward_id}</span>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '4px',
                  background: w.color_hex,
                  color: '#000'
                }}>
                  {w.risk_level}
                </span>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                {w.ward_name}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{displayLabel}:</span>
                <strong style={{ color: '#fff' }}>{displayVal}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Ward Comprehensive Detail Card */}
      {selectedWard && (
        <div style={{
          marginTop: '16px',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
          borderRadius: '14px',
          border: `1px solid ${selectedWard.color_hex}`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.4)`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc' }}>
                  Ward #{selectedWard.ward_id} — {selectedWard.ward_name}
                </span>
                <span style={{ fontSize: '11px', background: `${selectedWard.color_hex}22`, border: `1px solid ${selectedWard.color_hex}`, color: selectedWard.color_hex, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                  {selectedWard.risk_level} RISK (Score: {selectedWard.ipcc_risk_score}/100)
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                DEM Elevation: <strong>{selectedWard.elevation_m}m</strong> | River Proximity: <strong>{selectedWard.dist_to_water_m}m</strong> | TPI: <strong>{selectedWard.tpi_value} ({selectedWard.tpi_category})</strong> | LULC: <strong>{selectedWard.lulc_category}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: 6 }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Hazard (H)</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ef4444' }}>{selectedWard.hazard_score}</div>
              </div>
              <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: 6 }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Vuln (V)</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b' }}>{selectedWard.vulnerability_score}</div>
              </div>
              <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: 6 }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Exp (E)</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>{selectedWard.exposure_score}</div>
              </div>
              <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '6px 12px', borderRadius: 8, border: `1px solid ${selectedWard.color_hex}` }}>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Water Depth</div>
                <div style={{ fontSize: '17px', fontWeight: 900, color: selectedWard.color_hex }}>{selectedWard.water_depth_cm} cm</div>
              </div>
            </div>
          </div>

          {/* Environmental Parameter Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, background: 'rgba(15,23,42,0.6)', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
              🌿 <strong>NDVI:</strong> {selectedWard.ndvi}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
              💧 <strong>NDWI:</strong> {selectedWard.ndwi}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
              📐 <strong>Slope:</strong> {selectedWard.slope_pct}%
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
              🌱 <strong>Soil Moisture (5m/10m/20m):</strong> {selectedWard.soil_moisture?.depth_5m_pct}% / {selectedWard.soil_moisture?.depth_10m_pct}% / {selectedWard.soil_moisture?.depth_20m_pct}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

