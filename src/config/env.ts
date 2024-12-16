// Environment configuration
export const config = {
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
  apiUrl: 'https://openrouter.ai/api/v1/chat/completions'
};
