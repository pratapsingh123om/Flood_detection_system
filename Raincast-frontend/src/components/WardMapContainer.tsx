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

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.85)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '20px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      color: '#f8fafc'
    }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🗺️ Indore Municipal 85-Ward Flood Hazard Inundation Map
          </h3>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            Calculated via 30m SRTM DEM Topography & SCS-CN Runoff Hydrodynamics
          </span>
        </div>

        {/* Stoplight Summary Counters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setRiskFilter('HIGH')}
            style={{
              background: riskFilter === 'HIGH' ? '#ef4444' : 'rgba(239, 68, 68, 0.15)',
              color: riskFilter === 'HIGH' ? '#fff' : '#fca5a5',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
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
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🟠 Moderate ({modRiskCount})
          </button>

          <button
            onClick={() => setRiskFilter('LOW')}
            style={{
              background: riskFilter === 'LOW' ? '#10b981' : 'rgba(16, 185, 129, 0.15)',
              color: riskFilter === 'LOW' ? '#fff' : '#6ee7b7',
              border: '1px solid #10b981',
              borderRadius: '8px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
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
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            All Wards ({wardRisks.length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="🔍 Search ward by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '13px',
            outline: 'none'
          }}
        />
      </div>

      {/* Grid Matrix Visualization */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '8px',
        maxHeight: '260px',
        overflowY: 'auto',
        paddingRight: '4px'
      }}>
        {filteredWards.map((w) => {
          const isSelected = selectedWard?.ward_id === w.ward_id;
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
                <span style={{ fontSize: '11px', fontWeight: 700, color: w.color_hex }}>#{w.ward_id}</span>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
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
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                Depth: <strong style={{ color: '#fff' }}>{w.water_depth_cm} cm</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Ward Detail Card */}
      {selectedWard && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))',
          borderRadius: '12px',
          border: `1px solid ${selectedWard.color_hex}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
              Selected: Ward #{selectedWard.ward_id} — {selectedWard.ward_name}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
              Lat/Lon: {selectedWard.latitude}, {selectedWard.longitude} | DEM Elevation: {selectedWard.elevation_m}m
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Predicted Rain</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#60a5fa' }}>{selectedWard.predicted_rain_mm} mm</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Surface Runoff</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#a78bfa' }}>{selectedWard.runoff_mm} mm</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Waterlogging Depth</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: selectedWard.color_hex }}>{selectedWard.water_depth_cm} cm</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
