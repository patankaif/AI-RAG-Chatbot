export function chunkText(text, chunkSize = 800, overlap = 100) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const chunks = [];
    let i = 0;
  
    while (i < words.length) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      if (chunk.trim().length > 20) {
        chunks.push({
          id: chunks.length,
          text: chunk,
          wordStart: i,
          wordEnd: Math.min(i + chunkSize, words.length),
        });
      }
      i += chunkSize - overlap;
    }
  
    return chunks;
  }