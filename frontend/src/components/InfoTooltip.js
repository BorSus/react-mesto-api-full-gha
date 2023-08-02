import React from 'react';
import fail from '../images/fail_icon.svg';
import success from '../images/success_icon.svg';
function InfoTooltip({
  namePopup,
  isOpen,
  isFailRegistration,
  onClose,
  onHandleOverlayPopupClick,
  registrationText
}) {
  return (
    <div
      className={`popup popup_type_${namePopup} 
      ${isOpen ? `popup_opened` : ''}`}
      id={namePopup}
      onClick={onHandleOverlayPopupClick}
    >
      <div className="popup__container">
        <div className="popup__infoTooltip">
          <img
            src={isFailRegistration ? fail : success}
            alt={isFailRegistration ? 'ошибка при регистрации' : 'регистрация успешна'}
            className="popup__icon"
          />
          <h2 className="popup__title">{registrationText}</h2>
          <button
            className="popup__close"
            aria-label="Закрыть"
            type="button"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}
export default InfoTooltip;
