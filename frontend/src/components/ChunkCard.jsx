export default function ChunkCard({ chunk, highlighted, onClick }) {
    return (
      <div 
        onClick={() => onClick(chunk.id)} 
        style={{
          border: highlighted ? '1px solid #111827' : '1px solid #e5e7eb',
          background: highlighted ? '#f3f4f6' : '#ffffff',
          padding: '16px', 
          cursor: 'pointer',
          marginBottom: '12px',
          position: 'relative'
        }}
        onMouseOver={(e) => {
          if (!highlighted) {
            e.currentTarget.style.background = '#f9fafb';
          }
        }}
        onMouseOut={(e) => {
          if (!highlighted) {
            e.currentTarget.style.background = '#ffffff';
          }
        }}>
        
        <div style={{ 
          fontSize: 12, 
          color: highlighted ? '#111827' : '#4b5563', 
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontWeight: 'bold',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: 8
        }}>
          <span style={{
            color: '#111827',
          }}>
            Segment {chunk.id + 1}
          </span>
          <span style={{ color: '#9ca3af', fontWeight: 'normal' }}>|</span>
          <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>{chunk.text.split(/\s+/).length} words</span>
          {highlighted && (
            <span style={{
              marginLeft: 'auto',
              background: '#111827',
              color: '#ffffff',
              padding: '2px 6px',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Active
            </span>
          )}
        </div>
        <div style={{ 
          fontSize: 13, 
          color: '#374151', 
          lineHeight: 1.6
        }}>
          {chunk.text.substring(0, 150)}…
        </div>
      </div>
    );
  }