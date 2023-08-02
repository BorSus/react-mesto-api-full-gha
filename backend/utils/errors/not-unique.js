class NotUnique extends Error {
  constructor(message) {
    super(`Произошла ошибка:Conflict («конфликт»)==> ${message}`);
    this.statusCode = 409;
  }
}

module.exports = NotUnique;
