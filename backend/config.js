// Рекомендую создать в корне проекта файл с конфигурацией приложения. OK!
const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'development-secret-key';

const originUrlCORS = [
  'http://localhost:3001',
  'http://mesto.sustavov.nomoreparties.co',
  'https://mesto.sustavov.nomoreparties.co'
];

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = { secretKey, originUrlCORS, PORT, DB_URL };
