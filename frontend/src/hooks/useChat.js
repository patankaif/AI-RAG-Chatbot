import { useState } from 'react';
import { retrieveChunks } from '../utils/retriever';
import { queryWithContext } from '../services/geminiApi';

export function useChat(chunks) {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeChunks, setActiveChunks] = useState([]);

  async function sendMessage(query) {
    if (!query.trim() || !chunks.length) return;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setLoading(true);

    const relevant = retrieveChunks(query, chunks, 4);
    setActiveChunks(relevant.map(c => c.id));

    try {
      const answer = await queryWithContext({ query, chunks: relevant, history });
      setMessages(prev => [...prev, { role: 'ai', text: answer, sources: relevant }]);
      setHistory(prev => [
        ...prev,
        { role: 'user', content: query },
        { role: 'assistant', content: answer },
      ]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${err.message}`, sources: [] }]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setHistory([]);
    setActiveChunks([]);
  }

  return { messages, loading, activeChunks, sendMessage, clearChat };
}