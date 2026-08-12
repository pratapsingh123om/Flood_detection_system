import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProgressPage from './pages/ProgressPage'

export default function App() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#04080f', fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(4, 8, 15, 0.95)' : 'rgba(4, 8, 15, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.12)',
          transition: 'background 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #00d4ff, #06ffa5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(0,212,255,0.4)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="#04080f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 18, color: '#e2eaf5', letterSpacing: '-0.02em' }}>
              Rain<span style={{ color: '#00d4ff' }}>Cast</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#6b8ab0', marginLeft: 4 }}>AI</span>
            </span>
          </NavLink>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NavLink
              to="/progress"
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '6px 16px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? '#00d4ff' : '#6b8ab0',
                background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
                transition: 'all 0.2s',
              })}
            >
              Progress Log
            </NavLink>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '6px 16px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? '#00d4ff' : '#6b8ab0',
                background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
                transition: 'all 0.2s',
              })}
            >
              About
            </NavLink>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '7px 20px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: isActive ? '#04080f' : '#04080f',
                background: 'linear-gradient(135deg, #00d4ff, #06ffa5)',
                boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                transition: 'all 0.2s',
              })}
            >
              Go to Dashboard
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div style={{ paddingTop: 60 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </div>
    </div>
  )
}
