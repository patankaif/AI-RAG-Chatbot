export default function StatsPanel({ stats, queryCount }) {
  const items = [
    { label: 'Segments', value: stats?.chunks ?? '—', color: '#3b82f6' },
    { label: 'Words',    value: stats?.words  ?? '—', color: '#8b5cf6' },
    { label: 'Pages',    value: stats?.pages  ?? '—', color: '#ec4899' },
    { label: 'Queries',  value: queryCount    ?? 0,   color: '#10b981' },
  ];
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: 12, 
    }}>
      {items.map(({ label, value, color }) => (
        <div key={label} style={{ 
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '16px 12px', 
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.borderColor = `rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, 0.4)`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        }}>
          <div style={{ 
            fontSize: 24, 
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: 4,
            display: 'flex',
            alignItems: 'baseline',
            gap: 6
          }}>
            {value}
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 10px ${color}`
            }} />
          </div>
          <span style={{ 
            fontSize: 11, 
            color: 'var(--text-secondary)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            fontWeight: '600'
          }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}