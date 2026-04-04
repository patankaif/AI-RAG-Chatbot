export default function ChunkCard({ chunk, highlighted, onClick }) {
    return (
      <div 
        onClick={() => onClick(chunk.id)} 
        style={{
          border: highlighted ? '2px solid #667eea' : '1px solid rgba(0,0,0,0.1)',
          background: highlighted 
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))' 
            : 'rgba(255,255,255,0.8)',
          borderRadius: '12px', 
          padding: '16px', 
          cursor: 'pointer',
          transition: 'all 0.3s ease', 
          marginBottom: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: highlighted 
            ? '0 8px 25px rgba(102, 126, 234, 0.3)' 
            : '0 2px 10px rgba(0,0,0,0.05)',
          transform: highlighted ? 'translateY(-2px)' : 'translateY(0)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          if (!highlighted) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
          }
        }}
        onMouseOut={(e) => {
          if (!highlighted) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            e.target.style.borderColor = 'rgba(0,0,0,0.1)';
          }
        }}>
        {highlighted && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: '12px 12px 0 0'
          }} />
        )}
        <div style={{ 
          fontSize: 11, 
          color: highlighted ? '#667eea' : '#666', 
          fontFamily: 'monospace', 
          marginBottom: 8,
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span style={{
            background: highlighted ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(0,0,0,0.1)',
            color: highlighted ? 'white' : '#666',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: 10,
            fontWeight: 'bold'
          }}>
            {chunk.id + 1}
          </span>
          <span>{chunk.text.split(/\s+/).length} words</span>
          {highlighted && (
            <span style={{
              background: 'rgba(102, 126, 234, 0.2)',
              color: '#667eea',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: 9,
              fontWeight: '600'
            }}>
              ACTIVE
            </span>
          )}
        </div>
        <div style={{ 
          fontSize: 12, 
          color: '#333', 
          lineHeight: 1.6,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          {chunk.text.substring(0, 150)}…
        </div>
      </div>
    );
  }