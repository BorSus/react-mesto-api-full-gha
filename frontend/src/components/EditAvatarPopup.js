/* === Popup редактирование аватара ===*/
import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoad, handleOverlayPopupClick }) {
  //переменная в котором содержится значение inputAvatarLink
  const inputAvatarLink = useRef();
  //сброс значения inputAvatarLink, при открытии
  useEffect(() => {
    inputAvatarLink.current.value = '';
  }, [isOpen]);
  // Обработчик изменения аватара пользователя на сервере
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatarLink.current.value
    });
    /*
    //очищение inputAvatarLink при отпраки на сервер
    inputAvatarLink.current.value = '';
    */
  }
  return (
    <PopupWithForm
      namePopup="popupAvatar"
      popupTitle="Обновить аватар"
      textSubmitButton={isLoad ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onHandleOverlayPopupClick={handleOverlayPopupClick}
    >
      <div className="popup__valid-input">
        <input
          ref={inputAvatarLink}
          type="url"
          className="popup__input-text"
          name="avatar"
          id="inputAvatarLink"
          placeholder="Сcылка на картинку"
          required
        />
        <span className="popup__error" id="inputAvatarLink-error">
          &nbsp
        </span>
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
