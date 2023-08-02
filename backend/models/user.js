const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: v => validator.isEmail(v),
        message: 'Некорректный Email'
      },
      required: [true, 'Поле "email" не может быть пустым'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Поле "password" не может быть пустым'],
      // Поле password не ограничено в длину, так как пароль хранится в виде хеша OK
      select: false
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто'
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
      default: 'Исследователь'
    },
    avatar: {
      type: String,
      validate: {
        validator: v => validator.isURL(v),
        message: 'Некорректный URL'
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
// Лишний код следует удалить, его не нужно загружать в git OK
