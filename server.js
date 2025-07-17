const express = require('express');
const cors = require('cors');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const TELEGRAM_TOKEN = '7913183689:AAHAXxoPbY36bE8kY3-yv377u3pjb2tNSG4';
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

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
app.post(`/bot${TELEGRAM_TOKEN}`, async (req, res) => {
  const { message } = req.body;
  if (message && message.text) {
    const chatId = message.chat.id;
    const question = message.text;
    try {
      const answer = `Тестовый ответ на вопрос: ${question}`;
      await bot.sendMessage(chatId, answer);
    } catch (error) {
      await bot.sendMessage(chatId, 'Ошибка: не удалось связаться с Grok');
    }
  }
  res.sendStatus(200);
});
const WEBHOOK_URL = 'https://grok-server.onrender.com';
bot.setWebHook(`${WEBHOOK_URL}/bot${TELEGRAM_TOKEN}`);
app.listen(process.env.PORT || 3001, () => {
  console.log('Server running');
});