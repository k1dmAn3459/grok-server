const response = await axios.post(
  'https://api.x.ai/grok3/ask',
  { query: question },
  { headers: { Authorization: 'Bearer YOUR_API_KEY' } }
);
res.json({ answer: response.data.answer });