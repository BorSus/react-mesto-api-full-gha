class BadRequest extends Error {
  constructor(message) {
    super(`Произошла ошибка:Bad Request («неправильный, некорректный запрос»)==> ${message}`);
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
