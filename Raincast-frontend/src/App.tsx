import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProgressPage from './pages/ProgressPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', fontFamily: "'Inter', sans-serif" }}>
      {/* Global Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          
          {/* Logo with Isohyet Contour Glyph */}
          <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
                <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="1.75"/>
                <circle cx="12" cy="12" r="2.5" fill="#FFFFFF"/>
              </svg>
            </div>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                RainCast <span style={{ color: 'var(--teal)', fontWeight: 600 }}>AI</span>
              </span>
              <span style={{ display: 'block', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: -2 }}>
                Indore Flood Instrument
              </span>
            </div>
          </NavLink>

          {/* Navigation Links + CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--teal)' : 'var(--ink-muted)',
                background: isActive ? 'var(--teal-light)' : 'transparent',
                transition: 'all 0.15s ease',
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/progress"
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--teal)' : 'var(--ink-muted)',
                background: isActive ? 'var(--teal-light)' : 'transparent',
                transition: 'all 0.15s ease',
              })}
            >
              Progress Flow
            </NavLink>

            <NavLink
              to="/about"
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--teal)' : 'var(--ink-muted)',
                background: isActive ? 'var(--teal-light)' : 'transparent',
                transition: 'all 0.15s ease',
              })}
            >
              About
            </NavLink>

            <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 8px' }} />

            <NavLink
              to="/dashboard"
              style={{
                textDecoration: 'none',
                background: 'var(--teal)',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 6px rgba(14, 124, 134, 0.25)',
                transition: 'background 0.15s ease',
              }}
            >
              <span>Dashboard</span>
              <span style={{ fontSize: 15 }}>→</span>
            </NavLink>
          </div>

        </div>
      </nav>

      {/* Main Content Router */}
      <div style={{ paddingTop: 64 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </div>
  )
}
