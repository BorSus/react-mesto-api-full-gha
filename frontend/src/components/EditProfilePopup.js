/* === Popup редактирование профиля ===*/
import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoad, handleOverlayPopupClick }) {
  //переменная состояния = cтейт, в котором содержится значение inputName
  const [name, setName] = useState('??');
  //переменная состояния = cтейт, в котором содержится значение inputDescription
  const [description, setDescription] = useState('??');
  //Подписка на контекст данные пользователя
  const currentUser = useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  // Обработчик изменения инпута обновляет стейт name
  function handleChangeName(e) {
    setName(e.target.value);
  }
  // Обработчик изменения инпута обновляет стейт description
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  // Обработчик изменения данных пользователя на сервере
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }
  return (
    <PopupWithForm
      namePopup="popupProfile"
      popupTitle="Редактировать профиль"
      textSubmitButton={isLoad ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
      onHandleOverlayPopupClick={handleOverlayPopupClick}
    >
      <div className="popup__valid-input">
        <input
          type="text"
          className="popup__input-text"
          id="inputName"
          name="name"
          placeholder="Имя профиля"
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleChangeName}
          required
        />
        <span className="popup__error" id="inputName-error">
          &nbsp
        </span>
      </div>
      <div className="popup__valid-input">
        <input
          type="text"
          className="popup__input-text"
          name="about"
          id="inputDescription"
          placeholder="Описание профиля"
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__error" id="inputDescription-error">
          &nbsp
        </span>
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
