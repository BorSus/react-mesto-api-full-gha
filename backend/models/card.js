const mongoose = require('mongoose');

const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    //  name — имя карточки, строка от 2 до 30 символов, обязательное поле;
    name: {
      type: String,
      required: [true, 'Поле "name" обезательно к заполнению'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30']
    },
    //  link — ссылка на картинку, строка, обязательно поле.
    link: {
      type: String,
      validate: {
        validator: v => validator.isURL(v),
        message: 'Некорректный URL'
      },
      required: [true, 'Поле "link" обезательно к заполнению']
    },
    //  owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    //  likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
      }
    ],
    //  createdAt — дата создания, тип Date, значение по умолчанию Date.now.
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('card', cardSchema);
// Лишний код следует удалить, его не нужно загружать в git OK
