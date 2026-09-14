import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }: { position: L.LatLng | null, setPosition: (p: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function DashboardPage() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  
  // Deterministic mock data based on Lat/Lng
  const mockData = useMemo(() => {
    if (!position) return null;
    const seed = Math.abs(position.lat * position.lng);
    
    // Generate 7 days of forecast
    const forecast = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      // Pseudo-random rainfall based on seed and day
      let predicted = (Math.sin(seed + i) * 30) + 40; 
      if (predicted < 0) predicted = 0;
      
      forecast.push({
        date: dayName,
        predicted: parseFloat(predicted.toFixed(1))
      });
    }

    const day1Forecast = forecast[0].predicted;
    const riskScore = Math.min(100, Math.max(10, Math.floor(((Math.cos(seed) * 30) + 50))));
    
    let riskLevel = 'Low';
    let riskColor = 'var(--risk-low)';
    let riskBg = 'var(--risk-low-light)';
    
    if (riskScore > 40 && riskScore <= 70) {
      riskLevel = 'Moderate';
      riskColor = 'var(--risk-med)';
      riskBg = 'var(--risk-med-light)';
    } else if (riskScore > 70) {
      riskLevel = 'High';
      riskColor = 'var(--risk-high)';
      riskBg = 'var(--risk-high-light)';
    }

    return {
      forecast,
      day1Forecast,
      riskScore,
      riskLevel,
      riskColor,
      riskBg,
      moisture: Math.floor((Math.sin(seed * 2) * 20) + 60),
      vulnerability: Math.floor((Math.cos(seed * 3) * 30) + 50),
      drainage: riskScore > 60 ? 'Stressed' : 'Normal',
      pressure: Math.floor((Math.sin(seed * 5) * 20) + 980),
      radiation: Math.floor((Math.cos(seed * 2) * 50) + 150),
      temp: Math.floor((Math.sin(seed) * 10) + 25)
    };
  }, [position]);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', background: 'var(--bg)' }}>
      {/* Map Section */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer 
          center={[22.5937, 78.9629]} 
          zoom={5} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <ZoomControl position="bottomleft" />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
        
        {!position && (
          <div style={{
            position: 'absolute',
            top: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--surface)',
            padding: '16px 24px',
            borderRadius: 12,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            zIndex: 1000,
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 8px', color: 'var(--ink)' }}>Select a Location</h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-muted)' }}>Click anywhere on the map of India to generate a localized forecast.</p>
          </div>
        )}
      </div>

      {/* Side Panel */}
      {position && mockData && (
        <div style={{ 
          width: 500, 
          background: 'var(--bg)', 
          borderLeft: '1px solid var(--border)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ padding: '24px 24px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Selected Coordinates
            </span>
            <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginTop: 4, fontFamily: "'IBM Plex Mono', monospace" }}>
              {position.lat.toFixed(4)}° N, {position.lng.toFixed(4)}° E
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
              <div className="stat-chip">Elev: ~{Math.floor(Math.abs(position.lat * 10))} m</div>
              <div className="stat-chip">Grid: 1km x 1km</div>
            </div>
          </div>

          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Primary Readout */}
            <div className="card-instrument" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Next 24-Hour Rainfall
                </div>
                <div style={{ fontSize: 42, fontWeight: 700, color: 'var(--ink)', lineHeight: 1, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {mockData.day1Forecast.toFixed(1)} <span style={{ fontSize: 18, color: 'var(--ink-muted)' }}>mm</span>
                </div>
              </div>
              
              <div style={{ position: 'relative', width: 72, height: 72 }}>
                <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="36" cy="36" r="30" stroke="#EDF2EE" strokeWidth="6" fill="none" />
                  <circle cx="36" cy="36" r="30" stroke="var(--teal)" strokeWidth="6" fill="none" strokeDasharray="188.4" strokeDashoffset={`${188.4 * (1 - 0.85)}`} strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--teal)' }}>
                  85%
                </div>
              </div>
            </div>

            {/* Weather Features */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
                <span style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Surface Temp</span>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginTop: 4 }}>{mockData.temp}°C</div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
                <span style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Surface Pressure</span>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginTop: 4 }}>{mockData.pressure} hPa</div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="card-instrument" style={{ padding: 20 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 15, color: 'var(--ink)' }}>7-Day Downscaled Forecast</h3>
              <div style={{ height: 160, width: '100%' }}>
                <ResponsiveContainer>
                  <LineChart data={mockData.forecast} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} />
                    <Tooltip 
                      contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: 13 }}
                      itemStyle={{ color: 'var(--teal)', fontWeight: 600 }}
                    />
                    <Line type="monotone" dataKey="predicted" name="Rainfall (mm)" stroke="var(--teal)" strokeWidth={3} dot={{ r: 4, fill: 'var(--surface)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Flood Risk */}
            <div style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 15, color: 'var(--ink)' }}>Live Flood-Risk Assessment</h3>
                <div style={{ background: mockData.riskBg, color: mockData.riskColor, padding: '4px 10px', borderRadius: 20, fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: mockData.riskColor }}></div>
                  {mockData.riskLevel} ({mockData.riskScore}/100)
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink-muted)' }}>Antecedent Moisture</span>
                    <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{mockData.moisture}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--bg)', borderRadius: 3 }}>
                    <div style={{ width: `${mockData.moisture}%`, height: '100%', background: 'var(--sky)', borderRadius: 3 }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink-muted)' }}>Terrain Vulnerability</span>
                    <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{mockData.vulnerability}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--bg)', borderRadius: 3 }}>
                    <div style={{ width: `${mockData.vulnerability}%`, height: '100%', background: 'var(--ochre)', borderRadius: 3 }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink-muted)' }}>Drainage Capacity</span>
                    <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{mockData.drainage}</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--bg)', borderRadius: 3 }}>
                    <div style={{ width: mockData.drainage === 'Stressed' ? '85%' : '30%', height: '100%', background: mockData.drainage === 'Stressed' ? 'var(--risk-high)' : 'var(--risk-low)', borderRadius: 3 }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
