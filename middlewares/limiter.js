const rateLimit = require('express-rate-limit');

// Ограничитель запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: 'Количество запросов на сервер превышено',
});

module.exports = limiter;
