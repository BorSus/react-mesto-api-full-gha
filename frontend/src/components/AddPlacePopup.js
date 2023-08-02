/* === Popup добавление карточки ===*/
import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoad, handleOverlayPopupClick }) {
  //переменная состояния = cтейт, в котором содержится значение inputPlacename
  const [name, setName] = useState('');
  //переменная состояния = cтейт, в котором содержится значение inputImageLink
  const [link, setLink] = useState('');
  //сброс cтейтов, при открытии
  useEffect(() => {
    setName(''); //в котором содержится значение inputPlacename
    setLink(''); //в котором содержится значение inputImageLink
  }, [isOpen]);
  // Обработчик изменения инпута обновляет стейт name
  function handleChangeName(e) {
    setName(e.target.value);
  }
  // Обработчик изменения инпута обновляет стейт description
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  // Обработчик добавления новую карточку на сервер
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }
  return (
    <PopupWithForm
      namePopup='popupPlace'
      popupTitle='Новое место'
      textSubmitButton={isLoad ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onHandleOverlayPopupClick={handleOverlayPopupClick}
    >
      <div className='popup__valid-input'>
        <input
          type='text'
          className='popup__input-text'
          name='name'
          id='inputPlacename'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          value={name}
          onChange={handleChangeName}
          required
        />
        <span className='popup__error' id='inputPlacename-error'>
          &nbsp
        </span>
      </div>
      <div className='popup__valid-input'>
        <input
          type='url'
          className='popup__input-text'
          name='link'
          id='inputImageLink'
          placeholder='Ссылка на картинку'
          value={link}
          onChange={handleChangeLink}
          required
        />
        <span className='popup__error' id='inputImageLink-error'>
          &nbsp
        </span>
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
