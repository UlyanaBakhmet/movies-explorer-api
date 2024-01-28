require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(cors());
// app.use(cors({ origin: [
//   'http://localhost:3001',
//   'https://bakhmet-movies.nomoredomainsmonster.ru',
//   'http://bakhmet-movies.nomoredomainsmonster.ru',
//   'https://api.bakhmet-movies.nomoredomainsmonster.ru',
//   'https://api.bakhmet-movies.nomoredomainsmonster.ru'
// ]
// credentials: true }));

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://bakhmet-movies.nomoredomainsmonster.ru',
    'http://bakhmet-movies.nomoredomainsmonster.ru',
    'https://api.bakhmet-movies.nomoredomainsmonster.ru',
    'http://api.bakhmet-movies.nomoredomainsmonster.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(options));

app.use(helmet());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.err('Ошибка подключения:', err));

app.listen(PORT, () => {
  console.log(`Запуск сервера на ${PORT} порту`);
});
