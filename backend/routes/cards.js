const router = require('express').Router();
const { validatorSchemaPostCard, validatorSchemaCardsById } = require('../middlewares/validator');
const { getAllCards, postCard, deleteCard, putLike, deleteLike } = require('../controllers/cards');

// GET /cards — возвращает все карточки
router.get('/cards', getAllCards);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/cards/:id', validatorSchemaCardsById, deleteCard);

// POST /cards — создаёт карточку
router.post('/cards', validatorSchemaPostCard, postCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/cards/:id/likes', validatorSchemaCardsById, putLike);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/cards/:id/likes', validatorSchemaCardsById, deleteLike);
module.exports = router;
