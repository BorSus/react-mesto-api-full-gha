//=============================Переменные=========
const enviroment = process.env.NODE_ENV;
//console.log(enviroment);
const baseUrl =
  enviroment === 'development'
    ? process.env.REACT_APP_LOCALHOST_URL
    : process.env.REACT_APP_SERVER_BACKEND_URL;
//console.log(baseUrl);
export const optionsApi = {
  //Адрес сервера проекта Mesto
  baseUrl: baseUrl,
  // информации о пользователе с сервера
  urlUser: '/users/me',
  //автар пользователя с сервера
  urlAvatar: '/users/me/avatar',
  // начальные карточки с сервера
  urlCards: '/cards',
  //Эндпоинт для идентификации
  urlSignup: `/signup`,
  //Эндпоинт для аутентификации
  urlSignin: `/signin`,
  //Эндпоинт для выхода пользователя, очитска JWT из cookies
  urlSignout: `/signout`,
  //Эндпоинт для авторизации
  urlAuthorise: `/users/me`,

  headers: {
    'Content-Type': 'application/json'
  }
};
/*
export const optionsApiAuthentication = {
  //Адрес сервера аутентификации
  //baseUrl: 'http://localhost:5000',
  baseUrl: `https://api.mesto.sustavov.nomoreparties.co`,
  
};
*/
export const configurationValidator = {
  formSelector: '.popup__form',
  inputTextSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__error_active'
};
