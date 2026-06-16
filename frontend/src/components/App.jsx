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
      background: '#fdfcfb',
      color: '#111827'
    }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px 32px', 
        borderBottom: '1px solid #e5e7eb', 
        background: '#ffffff', 
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ 
            width: 32, 
            height: 32, 
            border: '2px solid #111827',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#111827',
            fontWeight: 'bold',
            fontSize: 18
          }}>
            D
          </div>
          <div>
            <span style={{ 
              fontSize: 24, 
              fontWeight: 'bold',
              color: '#111827'
            }}>
              DocMind
            </span>
            <div style={{ 
              fontSize: 12, 
              color: '#4b5563',
              marginTop: 2,
              fontStyle: 'italic'
            }}>
              AI-Powered Document Intelligence
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 16,
          fontSize: 14, 
          color: '#4b5563' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            padding: '6px 12px',
            background: chunks.length ? '#f3f4f6' : '#fef2f2',
            border: chunks.length ? '1px solid #e5e7eb' : '1px solid #fecaca',
          }}>
            <div style={{ 
              width: 8, 
              height: 8, 
              background: chunks.length ? '#111827' : '#ef4444',
            }} />
            {docLoading ? 'Processing document...' : docName || 'No document loaded'}
          </div>
          {chunks.length > 0 && (
            <button 
              onClick={() => { clearDocument(); clearChat(); setQueryCount(0); }}
              style={{ 
                background: '#ffffff', 
                border: '1px solid #111827', 
                padding: '8px 16px', 
                fontSize: 13, 
                color: '#111827', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#ffffff';
              }}
            >
              Close Document
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
    </div>
  );
}