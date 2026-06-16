import { useEffect, useRef } from 'react';

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{ 
      display: 'flex', 
      gap: 16, 
      flexDirection: isUser ? 'row-reverse' : 'row',
      marginBottom: 32, 
      alignItems: 'flex-start'
    }}>
      <div style={{ 
        width: 36, 
        height: 36, 
        flexShrink: 0,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontWeight: 'bold',
        background: isUser ? '#111827' : '#ffffff',
        color: isUser ? '#ffffff' : '#111827',
        border: '1px solid #111827',
        fontSize: 16,
      }}>
        {isUser ? 'U' : 'D'}
      </div>
      <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ 
          background: isUser ? '#f3f4f6' : '#ffffff',
          color: '#111827',
          border: '1px solid #e5e7eb',
          padding: '16px 24px', 
          fontSize: 15,
          lineHeight: 1.6, 
          whiteSpace: 'pre-wrap',
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
                border: '1px solid #d1d5db',
                color: '#4b5563', 
                padding: '2px 8px',
                background: '#ffffff'
              }}>
                Segment {s.id + 1}
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
      padding: '40px', 
      background: '#fdfcfb',
    }}>
      {messages.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          opacity: 0.8, 
          marginTop: 100,
          padding: '40px'
        }}>
          <div style={{ 
            fontSize: 28, 
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: 16,
            borderBottom: '1px solid #e5e7eb',
            display: 'inline-block',
            paddingBottom: 8
          }}>
            Ask your document anything
          </div>
          <div style={{ 
            fontSize: 16, 
            color: '#4b5563',
            fontStyle: 'italic'
          }}>
            Select a document to begin intelligent retrieval.
          </div>
        </div>
      )}
      {messages.map((msg, i) => <Message key={i} msg={msg} />)}
      {loading && (
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          marginBottom: 32,
          alignItems: 'flex-start'
        }}>
          <div style={{ 
            width: 36, 
            height: 36, 
            border: '1px solid #111827',
            background: '#ffffff',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#111827',
            fontSize: 16,
          }}>D</div>
          <div style={{ 
            background: '#ffffff', 
            border: '1px solid #e5e7eb', 
            padding: '16px 24px', 
            display: 'flex', 
            gap: 12, 
            alignItems: 'center',
          }}>
            <span style={{
              fontSize: 14,
              color: '#4b5563',
              fontStyle: 'italic'
            }}>
              Analyzing document...
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}