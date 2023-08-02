class NotFound extends Error {
  constructor(message) {
    super(`Произошла ошибка: Not Found («не найдено»)==> ${message}`);
    this.statusCode = 404;
  }
}

module.exports = NotFound;
