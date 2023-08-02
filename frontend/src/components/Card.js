import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onIconDeleteClick, onCardLike }) {
  //Подписка на контекст данные пользователя
  const currentUser = React.useContext(CurrentUserContext);
  //проверяем, наша ли эта карточка
  const ownerIsUser = currentUser._id === card.owner;
  //проверяем, есть ли уже лайк на этой карточке
  const isLikedCard = card.likes.some(like => like === currentUser._id);
  //Функция открыть Popup изображения
  function handleClick() {
    onCardClick(card);
  }
  //Функция поставить|убрать like
  function handleCardLike() {
    onCardLike(card);
  }
  //Функция открыть удаления карточки
  function handleIconDeleteClick() {
    onIconDeleteClick(card);
  }
  return (
    <article className='element'>
      <button
        type='button'
        className={`element__delete ${!ownerIsUser && `element__delete_hide`}`}
        aria-label='Удалить'
        onClick={handleIconDeleteClick}
      ></button>
      <img onClick={handleClick} src={card.link} alt={card.name} className='element__img' />
      <div className='element__label'>
        <h2 className='element__caption'>{card.name}</h2>
        <div className='element__like-block'>
          <button
            onClick={handleCardLike}
            type='button'
            className={`element__like ${isLikedCard && `element__like_active`}`}
            aria-label='Нравится'
          ></button>
          <p className='element__like-score'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
