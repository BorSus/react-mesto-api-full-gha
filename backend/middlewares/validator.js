const { celebrate, Joi } = require('celebrate');

const regexURL =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// Authorization
//  POST /signup — создаёт пользователя
const validatorSchemaPostNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexURL),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })
});
// POST /signin - проверка пользователя, получение JWT
const validatorSchemaLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })
});

// Users
// GET /users/me
// GET /users/:userId - возвращает пользователя по _id
const validatorSchemaGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
});
// PATCH /users/me — обновляет профиль
const validatorSchemaPatchUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
});
// PATCH /users/me/avatar — обновляет аватар
const validatorSchemaPatchUserAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().regex(regexURL)
    })
    .required()
});
// Cards
const validatorSchemaPostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(regexURL).required()
  })
});
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки
const validatorSchemaCardsById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
});
module.exports = {
  validatorSchemaPostNewUser,
  validatorSchemaLogin,
  validatorSchemaGetUserById,
  validatorSchemaPatchUserInfo,
  validatorSchemaPatchUserAvatar,
  validatorSchemaPostCard,
  validatorSchemaCardsById
};
