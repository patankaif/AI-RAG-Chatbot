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
      padding: '24px 40px', 
      borderTop: '1px solid #e5e7eb', 
      background: '#ffffff',
    }}>
      <div style={{ 
        display: 'flex', 
        gap: 16, 
        alignItems: 'flex-end', 
        background: '#ffffff',
        border: '1px solid #d1d5db', 
        padding: '12px 16px',
        transition: 'border-color 0.2s ease',
      }}
      onFocus={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = '#111827';
        }
      }}
      onBlur={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = '#d1d5db';
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
            fontSize: 16, 
            resize: 'none', 
            maxHeight: 120, 
            lineHeight: 1.5,
            background: 'transparent', 
            color: '#111827',
            opacity: disabled ? 0.5 : 1
          }} />
        <button 
          onClick={handleSend} 
          disabled={disabled || !value.trim()}
          style={{ 
            width: 40, 
            height: 40, 
            border: 'none',
            background: disabled || !value.trim() ? '#e5e7eb' : '#111827', 
            color: disabled || !value.trim() ? '#9ca3af' : '#ffffff', 
            cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
            fontSize: 18, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
          }}>
          ↑
        </button>
      </div>
      <div style={{ 
        textAlign: 'center', 
        fontSize: 12, 
        color: '#6b7280',
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        fontStyle: 'italic'
      }}>
        <span>RAG Pipeline</span>
        <span style={{ color: '#d1d5db' }}>|</span>
        <span>Retrieves relevant segments</span>
        <span style={{ color: '#d1d5db' }}>|</span>
        <span>Answers with Gemini</span>
      </div>
    </div>
  );
}