class Unauthorized extends Error {
  constructor(message) {
    super(`Произошла ошибка: Unauthorized («не авторизован»)==> ${message}`);
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
