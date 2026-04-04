import { useEffect, useRef } from 'react';

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{ 
      display: 'flex', 
      gap: 16, 
      flexDirection: isUser ? 'row-reverse' : 'row',
      marginBottom: 24, 
      animation: 'fadeIn 0.5s ease',
      alignItems: 'flex-start'
    }}>
      <div style={{ 
        width: 40, 
        height: 40, 
        borderRadius: '50%', 
        flexShrink: 0,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontWeight: '700',
        background: isUser 
          ? 'linear-gradient(135deg, #667eea, #764ba2)' 
          : 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        fontSize: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255,255,255,0.2)'
      }}>
        {isUser ? 'U' : '✦'}
      </div>
      <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ 
          background: isUser 
            ? 'linear-gradient(135deg, #667eea, #764ba2)' 
            : 'rgba(255,255,255,0.95)',
          color: isUser ? 'white' : '#1f2937',
          border: isUser ? 'none' : '1px solid rgba(0,0,0,0.1)',
          borderRadius: '20px', 
          padding: '16px 20px', 
          fontSize: 14,
          lineHeight: 1.6, 
          whiteSpace: 'pre-wrap',
          backdropFilter: 'blur(10px)',
          boxShadow: isUser 
            ? '0 4px 20px rgba(102, 126, 234, 0.3)' 
            : '0 4px 20px rgba(0,0,0,0.1)',
          fontWeight: '400',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
                fontFamily: 'monospace',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', 
                border: '1px solid rgba(102, 126, 234, 0.3)',
                color: '#667eea', 
                borderRadius: '20px', 
                padding: '4px 12px',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)'
              }}>
                📄 Chunk {s.id + 1}
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
      padding: '32px 36px', 
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(20px)'
    }}>
      {messages.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          opacity: 0.7, 
          marginTop: 120,
          padding: '40px'
        }}>
          <div style={{ 
            fontSize: 64, 
            marginBottom: 24,
            opacity: 0.5
          }}>
            📚
          </div>
          <div style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
            fontSize: 28, 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 12 
          }}>
            Ask your document anything
          </div>
          <div style={{ 
            fontSize: 16, 
            color: '#666',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Upload a PDF to get started with AI-powered document intelligence
          </div>
        </div>
      )}
      {messages.map((msg, i) => <Message key={i} msg={msg} />)}
      {loading && (
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          marginBottom: 24,
          alignItems: 'flex-start'
        }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white',
            fontSize: 16,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>✦</div>
          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            border: '1px solid rgba(0,0,0,0.1)', 
            borderRadius: '20px',
            padding: '20px 24px', 
            display: 'flex', 
            gap: 8, 
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                display: 'inline-block',
                animation: `bounce 1.4s ${i * 0.2}s infinite`,
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
              }} />
            ))}
            <span style={{
              marginLeft: 8,
              fontSize: 13,
              color: '#666',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Thinking...
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}