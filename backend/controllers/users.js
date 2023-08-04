const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { createToken } = require('../middlewares/auth');

const NotFound = require('../utils/errors/not-found');
const BadRequest = require('../utils/errors/bad-request');
const NotUnique = require('../utils/errors/not-unique');
const Unauthorized = require('../utils/errors/unauthorized');

//  POST /signup — создаёт пользователя
async function postNewUser(req, res, next) {
  try {
    const { email, password, name, about, avatar } = req.body;
    // Проверки на наличие полей в контроллерах следует удалить OK
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashPassword, name, about, avatar });
    res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new NotUnique(`Пользователь с таким email уже зарегистрирован`));
      return;
    }
    // проверка на ошибку CastError лишняя OK
    if (err.name === 'ValidationError') {
      next(
        new BadRequest(
          `${Object.values(err.errors)
            .map(error => error.message)
            .join(', ')}`
        )
      );
      return;
    }
    next(err);
  }
}

// POST /signin - проверка пользователя, получение JWT
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    // Проверки на наличие полей в контроллерах следует удалить OK
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Unauthorized(`Неправильный email или password`);
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      throw new Unauthorized(`Неправильный email или password`);
    }
    const payload = { _id: user._id };
    const token = createToken(payload);
    res.cookie('jwt', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.status(200).send({ message: `Пользователь ${email} авторизирован. JWT сохранен в cookie` });
  } catch (err) {
    next(err);
  }
}
// GET /users/me
function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        throw new NotFound('Пользователь не найден.');
      }
      // Статус 200 добавляется по дефолту, поэтому его можно не указывать OK
      res.send(user);
    })
    .catch(next);
}

//  GET /users — возвращает всех пользователей
function getAllUsers(req, res, next) {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(next);
}

//  GET /users/:userId - возвращает пользователя по _id
function getUserById(req, res, next) {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound(`Пользователь  ${id} не найден`));
        return;
      }
      if (err.name === 'CastError') {
        // Следует передать не саму ошибку, а только текст о том, что id некорректный OK
        next(new BadRequest(`Переданный id [${id}] пользователя некорректный`));
        return;
      }
      next(err);
    });
}

// PATCH /users/me — обновляет профиль
function patchUserInfo(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      // проверка на ошибку CastError лишняя OK
      if (err.name === 'ValidationError') {
        next(
          new BadRequest(
            `${Object.values(err.errors)
              .map(error => error.message)
              .join(', ')}`
          )
        );
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound(`Пользователь не найден`));
        return;
      }
      next(err);
    });
}
// PATCH /users/me/avatar — обновляет аватар
function patchUserAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      // проверка на ошибку CastError лишняя OK
      if (err.name === 'ValidationError') {
        next(
          new BadRequest(
            `${Object.values(err.errors)
              .map(error => error.message)
              .join(', ')}`
          )
        );
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound(`Пользователь не найден`));
        return;
      }
      next(err);
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  postNewUser,
  patchUserInfo,
  patchUserAvatar,
  login,
  getCurrentUser
};
