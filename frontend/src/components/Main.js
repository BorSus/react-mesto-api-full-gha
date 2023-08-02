import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onIconDeleteClick,
  onCardLike
}) {
  //Подписка на контекст данные пользователя
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-edite" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
          </div>
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edite-button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map(cardItem => (
          <Card
            card={cardItem}
            key={cardItem._id}
            onCardClick={onCardClick}
            onIconDeleteClick={onIconDeleteClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
