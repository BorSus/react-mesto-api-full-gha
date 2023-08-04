require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const controlErrors = require('./middlewares/controlErrors');

const { validatorSchemaPostNewUser, validatorSchemaLogin } = require('./middlewares/validator');

// const { corsMiddleware } = require('./middlewares/cors');

const { postNewUser, login } = require('./controllers/users');

const { checkAuthorization } = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFound = require('./utils/errors/not-found');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());
// подключаем CORS мидлвару
// app.use(corsMiddleware);
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://mesto.sustavov.nomoreparties.co',
      'https://mesto.sustavov.nomoreparties.co'
    ],

    credentials: true
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
//  Подключение к БД
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('DB connect');
  })
  .catch(err => {
    console.log(`DB not connect ==> ${err}`);
  });

// подключаем логгер запросов
app.use(requestLogger);
//  Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
//  Подключение путей авторизации
//  POST /signup — создаёт пользователя
app.post('/signup', validatorSchemaPostNewUser, postNewUser);
// POST /signin - проверка пользователя, получение JWT
app.post('/signin', validatorSchemaLogin, login);
// GET /signout - выход пользователя, очитска JWT из cookies
app.get('/signout', (req, res) => {
  res
    .clearCookie('jwt', { secure: true, sameSite: 'none' })
    .send({ message: 'Пользователь больше не авторизован,токен удален из cookies' });
});
//  Подключение путей пользователей  routes/users
app.use('/', checkAuthorization, require('./routes/users'));
//  Подключение путей карточек  routes/cards
app.use('/', checkAuthorization, require('./routes/cards'));
//  Подключение путей Not Found /*
// Роут неизвестного маршрута также следует защитить авторизацией OK
app.use('/*', checkAuthorization, (req, res, next) => {
  next(new NotFound(`Такого url не существует`));
});
// подключаем логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик ошибок
app.use(controlErrors);
app.listen(PORT, () => {
  console.log(`Порт приложения ${PORT}`);
});
