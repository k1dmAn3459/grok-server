const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/ask-grok', async (req, res) => {
  const { question } = req.body;
  try {
    res.json({ answer: `Тестовый ответ на вопрос: ${question}` });
  } catch (error) {
    res.status(500).json({ answer: 'Ошибка: не удалось связаться с Grok' });
  }
});

app.listen(process.env.PORT || 3001, () => console.log('Server running'));