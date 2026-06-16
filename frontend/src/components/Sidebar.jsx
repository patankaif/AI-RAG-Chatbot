import ChunkCard from './ChunkCard';
import StatsPanel from './StatsPanel';

export default function Sidebar({ chunks, stats, queryCount, activeChunks, onUpload, onChunkClick }) {
  return (
    <aside className="glass-panel" style={{ 
      width: 320, 
      borderRight: '1px solid var(--border-color)', 
      borderTop: 'none',
      borderBottom: 'none',
      borderLeft: 'none',
      display: 'flex', 
      flexDirection: 'column', 
      overflowY: 'auto', 
      flexShrink: 0
    }}>

      <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ 
          fontSize: 12, 
          letterSpacing: '0.1em',
          textTransform: 'uppercase', 
          color: 'var(--text-secondary)', 
          marginBottom: 16, 
          fontWeight: '700',
        }}>
          Data Source
        </h3>
        <label style={{ 
          display: 'block', 
          border: '2px dashed rgba(168, 85, 247, 0.3)', 
          borderRadius: '16px',
          padding: '32px 16px', 
          textAlign: 'center', 
          cursor: 'pointer', 
          background: 'rgba(168, 85, 247, 0.05)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
          e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
          e.currentTarget.style.background = 'rgba(168, 85, 247, 0.05)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <input type="file" accept=".pdf,.txt,.md" hidden
            onChange={e => e.target.files[0] && onUpload(e.target.files[0])} />
          <div style={{ 
            width: 48, 
            height: 48, 
            borderRadius: '12px', 
            background: 'rgba(255,255,255,0.05)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 16px',
            fontSize: 24
          }}>
            📄
          </div>
          <div style={{ 
            fontSize: 15, 
            fontWeight: '600', 
            color: 'var(--text-primary)',
            marginBottom: 6
          }}>
            Upload Document
          </div>
          <div style={{ 
            fontSize: 12, 
            color: 'var(--text-secondary)',
          }}>
            PDF, TXT, or MD
          </div>
        </label>
      </div>

      <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ 
          fontSize: 12, 
          letterSpacing: '0.1em',
          textTransform: 'uppercase', 
          color: 'var(--text-secondary)', 
          marginBottom: 16,
          fontWeight: '700',
        }}>
          Intelligence Metrics
        </h3>
        <StatsPanel stats={stats} queryCount={queryCount} />
      </div>

      {chunks.length > 0 && (
        <div style={{ padding: '32px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ 
            fontSize: 12, 
            letterSpacing: '0.1em',
            textTransform: 'uppercase', 
            color: 'var(--text-secondary)', 
            marginBottom: 16,
            fontWeight: '700',
          }}>
            Knowledge Base ({chunks.length})
          </h3>
          <div style={{ 
            maxHeight: '100%', 
            overflowY: 'auto',
            paddingRight: 8
          }}>
            {chunks.map((chunk, i) => (
              <ChunkCard key={chunk.id} chunk={chunk} index={i}
                highlighted={activeChunks.includes(chunk.id)}
                onClick={onChunkClick} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}