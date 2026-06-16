export default function ChunkCard({ chunk, index, highlighted, onClick }) {
  return (
    <div 
      onClick={() => onClick(chunk.id)} 
      style={{
        border: highlighted ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
        background: highlighted ? 'var(--glass-bg-hover)' : 'transparent',
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
          e.currentTarget.style.background = 'var(--glass-bg-hover)';
          e.currentTarget.style.borderColor = 'var(--border-highlight)';
        }
      }}
      onMouseOut={(e) => {
        if (!highlighted) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'var(--border-color)';
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
          background: highlighted ? 'var(--accent-primary)' : 'var(--border-color)',
          color: highlighted ? '#fff' : 'var(--text-primary)',
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
            color: 'var(--accent-primary)',
            background: 'var(--glass-bg-hover)',
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