import { useEffect, useRef } from 'react';

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{ 
      display: 'flex', 
      gap: 16, 
      flexDirection: isUser ? 'row-reverse' : 'row',
      marginBottom: 32, 
      alignItems: 'flex-start',
      animation: isUser ? 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{ 
        width: 40, 
        height: 40, 
        flexShrink: 0,
        borderRadius: '12px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontWeight: 'bold',
        background: isUser ? 'rgba(59, 130, 246, 0.1)' : 'var(--accent-gradient)',
        color: isUser ? '#60a5fa' : '#ffffff',
        border: isUser ? '1px solid rgba(59, 130, 246, 0.3)' : 'none',
        fontSize: 18,
        boxShadow: isUser ? 'none' : '0 4px 15px rgba(168, 85, 247, 0.3)'
      }}>
        {isUser ? 'U' : '✧'}
      </div>
      <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ 
          background: isUser ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'rgba(30, 41, 59, 0.7)',
          color: '#ffffff',
          border: isUser ? 'none' : '1px solid var(--glass-border)',
          borderRadius: isUser ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
          padding: '18px 24px', 
          fontSize: 15,
          lineHeight: 1.6, 
          whiteSpace: 'pre-wrap',
          backdropFilter: isUser ? 'none' : 'blur(12px)',
          boxShadow: isUser ? '0 8px 20px rgba(37, 99, 235, 0.2)' : '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          {msg.text}
        </div>
        {msg.sources?.length > 0 && (
          <div style={{ 
            display: 'flex', 
            gap: 8, 
            flexWrap: 'wrap',
            marginLeft: isUser ? 'auto' : 0,
            marginRight: isUser ? 0 : 'auto'
          }}>
            {msg.sources.map(s => (
              <span key={s.id} style={{ 
                fontSize: 11, 
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#d8b4fe', 
                padding: '4px 10px',
                borderRadius: '12px',
                background: 'rgba(168, 85, 247, 0.1)',
                fontWeight: '500'
              }}>
                Source {s.id + 1}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  return (
    <div style={{ 
      flex: 1, 
      overflowY: 'auto', 
      padding: '40px 60px', 
      position: 'relative'
    }}>
      {messages.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '15vh',
          animation: 'fadeIn 0.8s ease'
        }}>
          <div style={{ 
            width: 80,
            height: 80,
            margin: '0 auto 24px',
            background: 'var(--accent-gradient)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            color: 'white',
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)',
            transform: 'rotate(-10deg)'
          }}>
            ✧
          </div>
          <h2 className="text-gradient" style={{ 
            fontSize: 36, 
            fontWeight: '800',
            marginBottom: 16,
            letterSpacing: '-0.02em'
          }}>
            Ask DocMind
          </h2>
          <div style={{ 
            fontSize: 16, 
            color: 'var(--text-secondary)',
            maxWidth: 400,
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            Upload a document to unleash intelligent retrieval and unlock hidden insights.
          </div>
        </div>
      )}
      
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {loading && (
          <div style={{ 
            display: 'flex', 
            gap: 16, 
            marginBottom: 32,
            alignItems: 'flex-start',
            animation: 'fadeIn 0.5s ease'
          }}>
            <div style={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#fff',
              fontSize: 18,
              boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
            }}>✧</div>
            <div className="glass-panel" style={{ 
              borderRadius: '4px 20px 20px 20px',
              padding: '18px 24px', 
              display: 'flex', 
              gap: 12, 
              alignItems: 'center',
            }}>
              <span style={{
                fontSize: 14,
                color: 'var(--accent-primary)',
                fontWeight: '500',
                animation: 'thinking 2s infinite'
              }}>
                Synthesizing response...
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} style={{ height: 20 }} />
      </div>
    </div>
  );
}