class Forbidden extends Error {
  constructor(message) {
    super(`Произошла ошибка: Forbidden («запрещено»)==> ${message}`);
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
