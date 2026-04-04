import { useState } from 'react';
import { extractText } from '../utils/pdfParser';
import { chunkText } from '../utils/chunker';

export function useDocument() {
  const [chunks, setChunks] = useState([]);
  const [docName, setDocName] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadDocument(file) {
    setLoading(true);
    try {
      const text = await extractText(file);
      const parsed = chunkText(text, 800, 100);
      const wordCount = text.split(/\s+/).length;
      setChunks(parsed);
      setDocName(file.name);
      setStats({
        chunks: parsed.length,
        words: wordCount > 1000 ? (wordCount / 1000).toFixed(1) + 'k' : wordCount,
        pages: Math.ceil(wordCount / 250),
      });
    } finally {
      setLoading(false);
    }
  }

  function clearDocument() {
    setChunks([]);
    setDocName('');
    setStats(null);
  }

  return { chunks, docName, stats, loading, loadDocument, clearDocument };
}