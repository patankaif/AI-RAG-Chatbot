export default function StatsPanel({ stats, queryCount }) {
    const items = [
      { label: 'Chunks',  value: stats?.chunks ?? '—', icon: '📋', color: '#667eea' },
      { label: 'Words',   value: stats?.words  ?? '—', icon: '📝', color: '#764ba2' },
      { label: 'Pages',   value: stats?.pages  ?? '—', icon: '📄', color: '#8b5cf6' },
      { label: 'Queries', value: queryCount    ?? 0,   icon: '🔍', color: '#ec4899' },
    ];
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 12 
      }}>
        {items.map(({ label, value, icon, color }) => (
          <div key={label} style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '12px', 
            padding: '16px', 
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 8px 25px ${color}20`;
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${color}, ${color}80)`,
              borderRadius: '12px 12px 0 0'
            }} />
            <div style={{ 
              fontSize: 24, 
              marginBottom: 4,
              background: `linear-gradient(135deg, ${color}, ${color}80)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700'
            }}>
              {icon}
            </div>
            <div style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
              fontSize: 20, 
              display: 'block', 
              fontWeight: '700',
              color: '#333',
              marginBottom: 4
            }}>
              {value}
            </div>
            <span style={{ 
              fontSize: 10, 
              color: '#666', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              fontWeight: '600',
              fontFamily: 'monospace'
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }