//=============================Переменные=========
export const optionsApi = {
  //Адрес сервера проекта Mesto
  baseUrl: 'https://api.mesto.sustavov.nomoreparties.co',
  // информации о пользователе с сервера
  urlUser: '/users/me',
  //автар пользователя с сервера
  urlAvatar: '/users/me/avatar',
  // начальные карточки с сервера
  urlCards: '/cards',
  // токен
  headers: {
    authorization: '75e10885-ab4a-4ce4-a42e-f0872951e9bf',
    'Content-Type': 'application/json'
  }
};

export const optionsApiAuthentication = {
  //Адрес сервера аутентификации
  baseUrl: `https://api.mesto.sustavov.nomoreparties.co`,
  //Эндпоинт для идентификации
  urlSignup: `/signup`,
  //Эндпоинт для аутентификации
  urlSignin: `/signin`,
  //Эндпоинт для выхода пользователя, очитска JWT из cookies
  urlSignout: `/signout`,
  //Эндпоинт для авторизации
  urlAuthorise: `/users/me`
};
export const configurationValidator = {
  formSelector: '.popup__form',
  inputTextSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__error_active'
};
