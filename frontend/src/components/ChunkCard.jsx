export default function ChunkCard({ chunk, index, highlighted, onClick }) {
  return (
    <div 
      onClick={() => onClick(chunk.id)} 
      style={{
        border: highlighted ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid rgba(255,255,255,0.05)',
        background: highlighted ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255,255,255,0.02)',
        borderRadius: '12px',
        padding: '16px', 
        cursor: 'pointer',
        marginBottom: '12px',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: highlighted ? 'var(--shadow-glow)' : 'none'
      }}
      onMouseOver={(e) => {
        if (!highlighted) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }
      }}
      onMouseOut={(e) => {
        if (!highlighted) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        }
      }}>
      
      {highlighted && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--accent-gradient)',
          borderRadius: '12px 12px 0 0'
        }} />
      )}

      <div style={{ 
        fontSize: 12, 
        color: highlighted ? 'var(--text-primary)' : 'var(--text-secondary)', 
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontWeight: '600'
      }}>
        <div style={{
          background: highlighted ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
          color: '#fff',
          width: 20,
          height: 20,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10
        }}>
          {index + 1}
        </div>
        <span style={{ fontSize: 11, fontWeight: '400' }}>{chunk.text.split(/\s+/).length} words</span>
        {highlighted && (
          <span style={{
            marginLeft: 'auto',
            background: 'rgba(168, 85, 247, 0.2)',
            color: '#d8b4fe',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: 9,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Active
          </span>
        )}
      </div>
      <div style={{ 
        fontSize: 13, 
        color: 'var(--text-primary)', 
        lineHeight: 1.6,
        opacity: highlighted ? 1 : 0.8
      }}>
        {chunk.text.substring(0, 150)}…
      </div>
    </div>
  );
}