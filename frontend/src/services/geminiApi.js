const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Function to list available models (for debugging)
export async function listAvailableModels() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`);
  if (response.ok) {
    const data = await response.json();
    console.log('Available models:', data.models.map(m => m.name));
    return data.models;
  } else {
    console.error('Failed to list models:', await response.json());
    return [];
  }
}

export async function queryWithContext({ query, chunks, history = [] }) {
  const context = chunks
    .map((c, i) => `[Chunk ${i + 1}]\n${c.text}`)
    .join('\n\n---\n\n');

  const systemPrompt = `You are DocMind, an intelligent document assistant.
Answer questions based ONLY on the provided document context.
Be precise and cite which part of the document your answer comes from.
If the answer is not in the context, clearly say so.`;

  const userMessage = `Document context (retrieved via RAG):\n${context}\n\n---\nQuestion: ${query}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\n${userMessage}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'API request failed');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}