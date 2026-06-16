import { useState, useRef } from 'react';

export default function InputBar({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  function handleSend() {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    ref.current.style.height = 'auto';
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }

  return (
    <div style={{ 
      padding: '24px 60px 40px', 
      background: 'linear-gradient(to top, var(--bg-color) 60%, transparent)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="glass-panel" style={{ 
          display: 'flex', 
          gap: 16, 
          alignItems: 'flex-end', 
          borderRadius: '24px', 
          padding: '12px 12px 12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: disabled ? '1px solid var(--border-color)' : '1px solid var(--accent-primary)'
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
          }
        }}
        onBlur={(e) => {
          if (!disabled) {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.05)';
          }
        }}>
          <textarea 
            ref={ref} 
            rows={1} 
            value={value} 
            disabled={disabled}
            placeholder={disabled ? "Please upload a document to begin..." : "Message DocMind..."}
            onChange={e => { setValue(e.target.value); autoResize(e); }}
            onKeyDown={handleKey}
            style={{ 
              flex: 1, 
              border: 'none', 
              outline: 'none', 
              fontSize: 16, 
              resize: 'none', 
              maxHeight: 120, 
              lineHeight: 1.5,
              background: 'transparent', 
              color: 'var(--text-primary)',
              opacity: disabled ? 0.4 : 1,
              padding: '12px 0'
            }} />
          <button 
            onClick={handleSend} 
            disabled={disabled || !value.trim()}
            style={{ 
              width: 44, 
              height: 44, 
              borderRadius: '16px',
              border: 'none',
              background: disabled || !value.trim() ? 'var(--glass-bg-hover)' : 'var(--accent-gradient)', 
              color: disabled || !value.trim() ? 'var(--text-secondary)' : '#ffffff', 
              cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
              fontSize: 20, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: disabled || !value.trim() ? 'none' : 'var(--shadow-glow)'
            }}
            onMouseOver={(e) => {
              if (!disabled && value.trim()) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => {
              if (!disabled && value.trim()) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            >
            ↑
          </button>
        </div>
        <div style={{ 
          textAlign: 'center', 
          fontSize: 12, 
          color: 'var(--text-secondary)',
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          fontWeight: '500'
        }}>
          DocMind can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
}