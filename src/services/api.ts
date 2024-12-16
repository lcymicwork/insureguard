import { config } from '../config/env';

export async function callOpenRouter(prompt: string) {
  if (!config.apiKey) {
    throw new Error('OpenRouter API key not configured');
  }

  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-4',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to call OpenRouter API');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
