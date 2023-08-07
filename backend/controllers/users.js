const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

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
    if (err instanceof mongoose.Error.ValidationError) {
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
// Функция поиска пользователя по id и обработкa ошибок
async function searchUserById(id) {
  try {
    const user = await User.findById(id).orFail();
    return user;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new BadRequest(`Переданный id [${id}] пользователя некорректный`);
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      throw new NotFound(`Пользователь  ${id} не найден`);
    }
    throw err;
  }
}

// Функция кеширования поиска пользователя по ID
const cacheSearch = func => {
  let cache = new Map();
  return async function (x) {
    if (cache.has(x)) {
      console.log('Информация о пользователе получена из кеша');
      return cache.get(x);
    }
    let result = await func(x);
    cache.set(x, result);
    console.log('Информация о пользователе получена из запроса к БД');
    return result;
  };
};
searchUserById = cacheSearch(searchUserById);

// GET /users/me
async function getCurrentUser(req, res, next) {
  const id = req.user._id;
  // searchUserById = cacheSearch(searchUserById);
  try {
    const user = await searchUserById(id, next);
    return res.send(user);
  } catch (err) {
    next(err);
  }
}
//  GET /users/:userId - возвращает пользователя по _id
async function getUserById(req, res, next) {
  const { id } = req.params;
  try {
    const user = await searchUserById(id);
    return res.send(user);
  } catch (err) {
    next(err);
  }
}
//  GET /users — возвращает всех пользователей
function getAllUsers(req, res, next) {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(next);
}

// функция для обновления данных пользователя
function updateUser(updateData, req, res, next) {
  User.findByIdAndUpdate(req.user._id, updateData, { new: true, runValidators: true })
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequest(`
${Object.values(err.errors)
  .map(error => error.message)
  .join(', ')}`)
        );
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      next(err);
    });
}
// PATCH /users/me — обновляет профиль
function patchUserInfo(req, res, next) {
  const { name, about } = req.body;
  const updateData = { name, about };
  updateUser(updateData, req, res, next);
}
// PATCH /users/me/avatar — обновляет аватар
function patchUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const updateData = { avatar };
  updateUser(updateData, req, res, next);
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
