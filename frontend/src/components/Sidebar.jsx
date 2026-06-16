import ChunkCard from './ChunkCard';
import StatsPanel from './StatsPanel';

export default function Sidebar({ chunks, stats, queryCount, activeChunks, onUpload, onChunkClick }) {
  return (
    <aside style={{ 
      width: 320, 
      borderRight: '1px solid #e5e7eb', 
      background: '#f9fafb',
      display: 'flex', 
      flexDirection: 'column', 
      overflowY: 'auto', 
      flexShrink: 0
    }}>

      <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ 
          fontSize: 14, 
          letterSpacing: '0.05em',
          textTransform: 'uppercase', 
          color: '#111827', 
          marginBottom: 16, 
          fontWeight: 'bold',
          borderBottom: '1px solid #111827',
          paddingBottom: 4,
          display: 'inline-block'
        }}>
          Upload Document
        </h3>
        <label style={{ 
          display: 'block', 
          border: '1px dashed #9ca3af', 
          padding: '24px 16px', 
          textAlign: 'center', 
          cursor: 'pointer', 
          background: '#ffffff',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.borderColor = '#111827';
          e.target.style.background = '#f3f4f6';
        }}
        onMouseOut={(e) => {
          e.target.style.borderColor = '#9ca3af';
          e.target.style.background = '#ffffff';
        }}>
          <input type="file" accept=".pdf,.txt,.md" hidden
            onChange={e => e.target.files[0] && onUpload(e.target.files[0])} />
          <div style={{ fontSize: 32, marginBottom: 12, color: '#4b5563' }}>📄</div>
          <div style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: 4
          }}>
            Select a Document
          </div>
          <div style={{ 
            fontSize: 13, 
            color: '#6b7280',
            fontStyle: 'italic'
          }}>
            PDF, TXT, or MD formats
          </div>
        </label>
      </div>

      <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ 
          fontSize: 14, 
          letterSpacing: '0.05em',
          textTransform: 'uppercase', 
          color: '#111827', 
          marginBottom: 16,
          fontWeight: 'bold',
          borderBottom: '1px solid #111827',
          paddingBottom: 4,
          display: 'inline-block'
        }}>
          Statistics
        </h3>
        <StatsPanel stats={stats} queryCount={queryCount} />
      </div>

      {chunks.length > 0 && (
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ 
            fontSize: 14, 
            letterSpacing: '0.05em',
            textTransform: 'uppercase', 
            color: '#111827', 
            marginBottom: 16,
            fontWeight: 'bold',
            borderBottom: '1px solid #111827',
            paddingBottom: 4,
            display: 'inline-block'
          }}>
            Knowledge Base ({chunks.length} segments)
          </h3>
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