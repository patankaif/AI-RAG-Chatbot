import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import InputBar from './InputBar';
import { useDocument } from '../hooks/useDocument';
import { useChat } from '../hooks/useChat';

export default function App() {
  const { chunks, docName, stats, loading: docLoading, loadDocument, clearDocument } = useDocument();
  const { messages, loading, activeChunks, sendMessage, clearChat } = useChat(chunks);
  const [queryCount, setQueryCount] = useState(0);

  async function handleUpload(file) {
    clearChat();
    await loadDocument(file);
  }

  async function handleSend(query) {
    await sendMessage(query);
    setQueryCount(c => c + 1);
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      width: '100vw',
      position: 'relative'
    }}>
      {/* Dynamic Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(15,23,42,0) 70%)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(15,23,42,0) 70%)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <header className="glass-panel" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px 32px', 
        borderBottom: '1px solid var(--border-color)', 
        flexShrink: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
          }}>
            ✧
          </div>
          <div>
            <span className="text-gradient" style={{ 
              fontSize: 24, 
              fontWeight: '800',
              letterSpacing: '-0.02em'
            }}>
              DocMind
            </span>
            <div style={{ 
              fontSize: 12, 
              color: 'var(--text-secondary)',
              marginTop: 2,
              fontWeight: '500'
            }}>
              AI-Powered Document Intelligence
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 16,
          fontSize: 13, 
          color: 'var(--text-secondary)' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%',
              background: chunks.length ? '#10b981' : '#ef4444',
              boxShadow: chunks.length ? '0 0 10px #10b981' : '0 0 10px #ef4444'
            }} />
            <span style={{ fontWeight: 500 }}>
              {docLoading ? 'Processing...' : docName || 'Ready for upload'}
            </span>
          </div>
          {chunks.length > 0 && (
            <button 
              onClick={() => { clearDocument(); clearChat(); setQueryCount(0); }}
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.2)', 
                borderRadius: '8px',
                padding: '8px 16px', 
                fontSize: 13, 
                color: '#ef4444', 
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
              }}
            >
              Clear Session
            </button>
          )}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', zIndex: 1 }}>
        <Sidebar chunks={chunks} stats={stats} queryCount={queryCount}
          activeChunks={activeChunks} onUpload={handleUpload} onChunkClick={() => {}} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ChatWindow messages={messages} loading={loading} />
          <InputBar onSend={handleSend} disabled={!chunks.length || loading} />
        </div>
      </div>
    </div>
  );
}