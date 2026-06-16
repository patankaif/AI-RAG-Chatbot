export default function StatsPanel({ stats, queryCount }) {
    const items = [
      { label: 'Chunks',  value: stats?.chunks ?? '—' },
      { label: 'Words',   value: stats?.words  ?? '—' },
      { label: 'Pages',   value: stats?.pages  ?? '—' },
      { label: 'Queries', value: queryCount    ?? 0   },
    ];
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 1px, 
        background: '#e5e7eb', // Border color for the grid lines
        border: '1px solid #e5e7eb'
      }}>
        {items.map(({ label, value }) => (
          <div key={label} style={{ 
            background: '#ffffff',
            padding: '16px 12px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ 
              fontSize: 20, 
              display: 'block', 
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: 4
            }}>
              {value}
            </div>
            <span style={{ 
              fontSize: 11, 
              color: '#6b7280', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em'
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }