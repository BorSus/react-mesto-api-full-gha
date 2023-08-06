const jwt = require('jsonwebtoken');

const Unauthorized = require('../utils/errors/unauthorized');

const { secretKey } = require('../config');

function createToken(payload) {
  return jwt.sign(payload, secretKey, {
    expiresIn: '7d'
  });
}
// Эта проверка и обертка ниже ненужны — сделайте как функция выше. OK!
function checkToken(token) {
  return jwt.verify(token, secretKey);
}

function checkAuthorization(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    // Ошибку в центральный обработчик нужно передавать напрямую при помощи функции next. OK!
    // работу функции нужно прервать при помощи оператора return
    return next(new Unauthorized(`JWT из cookies не получен`));
  }
  //let payload;
  try {
    const payload = checkToken(token);
    req.user = payload;
  } catch (_) {
    return next(new Unauthorized(`Токен не прошел проверку`));
  }

  return next();
}

module.exports = { createToken, checkToken, checkAuthorization };
