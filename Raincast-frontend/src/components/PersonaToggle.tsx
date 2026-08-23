import React from 'react';

interface PersonaToggleProps {
  persona: 'hydrologist' | 'planner';
  onToggle?: (persona: 'hydrologist' | 'planner') => void;
  setPersona?: (persona: 'hydrologist' | 'planner') => void;
}

export const PersonaToggle: React.FC<PersonaToggleProps> = ({ persona, onToggle, setPersona }) => {
  const handleToggle = (p: 'hydrologist' | 'planner') => {
    if (onToggle) onToggle(p);
    if (setPersona) setPersona(p);
  };

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'var(--bg)',
      padding: '3px',
      borderRadius: '8px',
      border: '1px solid var(--border)',
    }}>
      <button
        type="button"
        onClick={() => handleToggle('planner')}
        style={{
          padding: '5px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          background: persona === 'planner' ? 'var(--teal)' : 'transparent',
          color: persona === 'planner' ? '#ffffff' : 'var(--ink-muted)',
          boxShadow: persona === 'planner' ? '0 1px 4px rgba(14, 124, 134, 0.25)' : 'none'
        }}
      >
        🛡️ Emergency Planner
      </button>

      <button
        type="button"
        onClick={() => handleToggle('hydrologist')}
        style={{
          padding: '5px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          background: persona === 'hydrologist' ? 'var(--teal)' : 'transparent',
          color: persona === 'hydrologist' ? '#ffffff' : 'var(--ink-muted)',
          boxShadow: persona === 'hydrologist' ? '0 1px 4px rgba(14, 124, 134, 0.25)' : 'none'
        }}
      >
        🔬 Hydrologist
      </button>
    </div>
  );
};
