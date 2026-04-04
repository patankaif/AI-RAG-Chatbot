import ChunkCard from './ChunkCard';
import StatsPanel from './StatsPanel';

export default function Sidebar({ chunks, stats, queryCount, activeChunks, onUpload, onChunkClick }) {
  return (
    <aside style={{ 
      width: 320, 
      borderRight: '1px solid rgba(255,255,255,0.1)', 
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex', 
      flexDirection: 'column', 
      overflowY: 'auto', 
      flexShrink: 0,
      boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
    }}>

      <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ 
          fontSize: 11, 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
          letterSpacing: '0.1em',
          textTransform: 'uppercase', 
          color: '#666', 
          marginBottom: 16, 
          fontWeight: '600'
        }}>
          Upload Document
        </div>
        <label style={{ 
          display: 'block', 
          border: '2px dashed rgba(102, 126, 234, 0.3)', 
          borderRadius: '16px',
          padding: '32px 24px', 
          textAlign: 'center', 
          cursor: 'pointer', 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.target.style.borderColor = 'rgba(102, 126, 234, 0.6)';
          e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
        }}
        onMouseOut={(e) => {
          e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
          e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))';
        }}>
          <input type="file" accept=".pdf,.txt,.md" hidden
            onChange={e => e.target.files[0] && onUpload(e.target.files[0])} />
          <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.7 }}>📄</div>
          <div style={{ 
            fontSize: 16, 
            fontWeight: '600', 
            color: '#333',
            marginBottom: 4
          }}>
            Drop your PDF here
          </div>
          <div style={{ 
            fontSize: 12, 
            color: '#666',
            fontFamily: 'monospace'
          }}>
            or click to browse · PDF, TXT, MD
          </div>
        </label>
      </div>

      <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ 
          fontSize: 11, 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
          letterSpacing: '0.1em',
          textTransform: 'uppercase', 
          color: '#666', 
          marginBottom: 16,
          fontWeight: '600'
        }}>
          Document Statistics
        </div>
        <StatsPanel stats={stats} queryCount={queryCount} />
      </div>

      {chunks.length > 0 && (
        <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ 
            fontSize: 11, 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
            letterSpacing: '0.1em',
            textTransform: 'uppercase', 
            color: '#666', 
            marginBottom: 16,
            fontWeight: '600'
          }}>
            Knowledge Chunks ({chunks.length})
          </div>
          <div style={{ 
            maxHeight: 400, 
            overflowY: 'auto',
            paddingRight: 8
          }}>
            {chunks.map(chunk => (
              <ChunkCard key={chunk.id} chunk={chunk}
                highlighted={activeChunks.includes(chunk.id)}
                onClick={onChunkClick} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}