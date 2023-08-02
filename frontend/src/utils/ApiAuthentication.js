import { optionsApiAuthentication } from './constants.js';
class ApiAuthentication {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._urlSignup = options.urlSignup;
    this._urlSignin = options.urlSignin;
    this._urlSignout = options.urlSignout;
    this._urlAuthorise = options.urlAuthorise;
  }
  //Проверка ответа сервера и преобразование из json
  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  //Регистрация  нового пользователя
  async postNewUser(data) {
    const response = await fetch(`${this._baseUrl}${this._urlSignup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    });
    return this._getResponseData(response);
  }
  //Вход пользователя
  async postLoginUser(data) {
    const response = await fetch(`${this._baseUrl}${this._urlSignin}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    });
    return this._getResponseData(response);
  }
  //Проверки валидности токена и получения email
  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}${this._urlAuthorise}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return this._getResponseData(response);
  }
  // выход пользователя, очитска JWT из cookies
  async getUserOut() {
    const response = await fetch(`${this._baseUrl}${this._urlSignout}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return this._getResponseData(response);
  }
}
export const apiAuthentication = new ApiAuthentication(optionsApiAuthentication);
