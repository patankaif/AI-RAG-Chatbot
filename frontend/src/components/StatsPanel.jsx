export default function StatsPanel({ stats, queryCount }) {
  const items = [
    { label: 'Segments', value: stats?.chunks ?? '—', color: 'var(--accent-secondary)' },
    { label: 'Words',    value: stats?.words  ?? '—', color: 'var(--accent-primary)' },
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
          background: 'var(--glass-bg-hover)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '16px 12px', 
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-highlight)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
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