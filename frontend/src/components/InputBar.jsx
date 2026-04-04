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
      padding: '20px 32px 24px', 
      borderTop: '1px solid rgba(255,255,255,0.2)', 
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: 16, 
        alignItems: 'flex-end', 
        background: 'rgba(255,255,255,0.8)',
        border: disabled ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(102, 126, 234, 0.3)', 
        borderRadius: '20px', 
        padding: '16px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onFocus={(e) => {
        if (!disabled) {
          e.target.style.borderColor = 'rgba(102, 126, 234, 0.6)';
          e.target.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.15)';
        }
      }}
      onBlur={(e) => {
        if (!disabled) {
          e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
          e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
        }
      }}>
        <textarea 
          ref={ref} 
          rows={1} 
          value={value} 
          disabled={disabled}
          placeholder={disabled ? "Upload a document first..." : "Ask a question about your document..."}
          onChange={e => { setValue(e.target.value); autoResize(e); }}
          onKeyDown={handleKey}
          style={{ 
            flex: 1, 
            border: 'none', 
            outline: 'none', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 15, 
            resize: 'none', 
            maxHeight: 120, 
            lineHeight: 1.5,
            background: 'transparent', 
            color: '#1f2937',
            fontWeight: '400',
            opacity: disabled ? 0.6 : 1
          }} />
        <button 
          onClick={handleSend} 
          disabled={disabled || !value.trim()}
          style={{ 
            width: 44, 
            height: 44, 
            borderRadius: '14px', 
            border: 'none',
            background: disabled || !value.trim() 
              ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
              : 'linear-gradient(135deg, #667eea, #764ba2)', 
            color: 'white', 
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: 20, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: disabled || !value.trim() 
              ? 'none' 
              : '0 4px 16px rgba(102, 126, 234, 0.4)',
            transform: disabled || !value.trim() ? 'scale(1)' : 'scale(1.05)'
          }}
          onMouseOver={(e) => {
            if (!disabled && value.trim()) {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
            }
          }}
          onMouseOut={(e) => {
            if (!disabled && value.trim()) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.4)';
            }
          }}>
          ↑
        </button>
      </div>
      <div style={{ 
        textAlign: 'center', 
        fontSize: 11, 
        color: '#666',
        fontFamily: 'monospace', 
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16
      }}>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 6,
          padding: '4px 12px',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          🔍 RAG
        </span>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 6,
          padding: '4px 12px',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          📄 Retrieves relevant chunks
        </span>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 6,
          padding: '4px 12px',
          background: 'rgba(236, 72, 153, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(236, 72, 153, 0.2)'
        }}>
          ✨ Answers with Gemini
        </span>
      </div>
    </div>
  );
}