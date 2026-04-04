function tokenize(text) {
    const stopwords = new Set([
      'the','a','an','and','or','but','in','on','at','to','for',
      'of','with','by','from','is','are','was','were','be','been',
      'have','has','had','do','does','did','will','would','could',
      'should','that','this','it','its','we','they','he','she','you','i'
    ]);
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopwords.has(w));
  }
  
  function computeScore(queryTokens, docTokens) {
    const freq = {};
    for (const w of docTokens) freq[w] = (freq[w] || 0) + 1;
    let score = 0;
    for (const qw of queryTokens) {
      if (freq[qw]) score += 1 + Math.log(freq[qw]);
      for (const dw of Object.keys(freq)) {
        if (dw !== qw && (dw.includes(qw) || qw.includes(dw))) score += 0.3;
      }
    }
    return score;
  }
  
  export function retrieveChunks(query, chunks, topK = 4) {
    if (!chunks.length) return [];
    const queryTokens = tokenize(query);
    return chunks
      .map(chunk => ({ ...chunk, score: computeScore(queryTokens, tokenize(chunk.text)) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }