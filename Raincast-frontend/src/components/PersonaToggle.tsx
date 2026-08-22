import React from 'react';

interface PersonaToggleProps {
  persona: 'hydrologist' | 'planner';
  onToggle: (persona: 'hydrologist' | 'planner') => void;
}

export const PersonaToggle: React.FC<PersonaToggleProps> = ({ persona, onToggle }) => {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(15, 23, 42, 0.75)',
      padding: '4px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
    }}>
      <button
        type="button"
        onClick={() => onToggle('planner')}
        style={{
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: persona === 'planner' ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : 'transparent',
          color: persona === 'planner' ? '#ffffff' : '#94a3b8',
          boxShadow: persona === 'planner' ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none'
        }}
      >
        🛡️ Emergency Planner
      </button>

      <button
        type="button"
        onClick={() => onToggle('hydrologist')}
        style={{
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: persona === 'hydrologist' ? 'linear-gradient(135deg, #7c3aed, #8b5cf6)' : 'transparent',
          color: persona === 'hydrologist' ? '#ffffff' : '#94a3b8',
          boxShadow: persona === 'hydrologist' ? '0 2px 8px rgba(124, 58, 237, 0.4)' : 'none'
        }}
      >
        🔬 Hydrologist / Technical
      </button>
    </div>
  );
};
