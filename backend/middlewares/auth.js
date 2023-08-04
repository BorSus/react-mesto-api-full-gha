const jwt = require('jsonwebtoken');

const Unauthorized = require('../utils/errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'development-secret-key';
// console.log(secretKey);
// console.log(NODE_ENV);
// console.log(JWT_SECRET);
function createToken(payload) {
  return jwt.sign({ payload }, secretKey, {
    expiresIn: '7d'
  });
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return false;
  }
}

function checkAuthorization(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized(`JWT из cookies не получен`);
  }
  const payload = checkToken(token);
  if (!payload) {
    throw new Unauthorized(`Токен не прошел проверку`);
  }

  req.user = payload.payload;

  next();
}

module.exports = { createToken, checkToken, checkAuthorization };
