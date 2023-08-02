const router = require('express').Router();
const {
  validatorSchemaGetUserById,
  validatorSchemaPatchUserInfo,
  validatorSchemaPatchUserAvatar
} = require('../middlewares/validator');
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  patchUserInfo,
  patchUserAvatar
} = require('../controllers/users');

// GET /users/me
router.get('/users/me', getCurrentUser);
//  GET /users/:userId - возвращает пользователя по _id
router.get('/users/:id', validatorSchemaGetUserById, getUserById);

//  GET /users — возвращает всех пользователей
router.get('/users', getAllUsers);
// PATCH /users/me — обновляет профиль
router.patch('/users/me', validatorSchemaPatchUserInfo, patchUserInfo);
// PATCH /users/me/avatar — обновляет аватар
router.patch('/users/me/avatar', validatorSchemaPatchUserAvatar, patchUserAvatar);

module.exports = router;

/*
{
  "email": "Gagarin@mail.su",
  "password":"Vostok-1",
  "name": "Юрий Гагарин",
  "about": "ПОЕХАЛИ",
  "avatar": "https://афанасьевский-музей.рф/upload/iblock/fc3/fc31305309e31e12c5cf158e10ae83d6.jpg"
   }
   */
