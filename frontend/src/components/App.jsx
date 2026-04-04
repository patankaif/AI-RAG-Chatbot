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
      background: '#f8f9fa',
      fontFamily: "'Times New Roman', serif"
    }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '20px 32px', 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        background: '#e8e3f3', 
        backdropFilter: 'blur(10px)',
        flexShrink: 0,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18
          }}>
            📚
          </div>
          <div>
            <span style={{ 
              fontFamily: "'Times New Roman', serif", 
              fontSize: 24, 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              DocMind
            </span>
            <div style={{ 
              fontSize: 11, 
              fontFamily: 'monospace', 
              color: '#666',
              marginTop: 2
            }}>
              AI-Powered Document Intelligence
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12,
          fontFamily: 'monospace', 
          fontSize: 12, 
          color: '#666' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            padding: '8px 16px',
            background: 'rgba(255, 107, 107, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 107, 107, 0.2)'
          }}>
            <div style={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              background: chunks.length ? '#10B981' : '#FF6B6B',
              animation: chunks.length ? 'pulse 2s infinite' : 'none'
            }} />
            {docLoading ? 'Processing...' : docName || 'No document loaded'}
          </div>
          {chunks.length > 0 && (
            <button 
              onClick={() => { clearDocument(); clearChat(); setQueryCount(0); }}
              style={{ 
                background: 'linear-gradient(135deg, #FF6B6B, #FF5252)', 
                border: 'none', 
                borderRadius: '12px',
                padding: '10px 20px', 
                fontSize: 12, 
                color: 'white', 
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';;
              }}
            >
              Clear Document
            </button>
          )}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar chunks={chunks} stats={stats} queryCount={queryCount}
          activeChunks={activeChunks} onUpload={handleUpload} onChunkClick={() => {}} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ChatWindow messages={messages} loading={loading} />
          <InputBar onSend={handleSend} disabled={!chunks.length || loading} />
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}