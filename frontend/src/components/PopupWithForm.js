import React from 'react';
function PopupWithForm({
  namePopup,
  popupTitle,
  textSubmitButton,
  isOpen,
  onClose,
  onSubmit,
  children,
  onHandleOverlayPopupClick
}) {
  return (
    <div
      className={`popup popup_type_${namePopup} 
      ${isOpen ? `popup_opened` : ''}`}
      id={namePopup}
      onClick={onHandleOverlayPopupClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{popupTitle}</h2>
        <button
          className="popup__close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={namePopup} onSubmit={onSubmit}>
          {children}
          <button className="popup__save" type="submit">
            {textSubmitButton}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
