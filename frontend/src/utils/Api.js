import { optionsApi } from './constants.js';
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._urlUser = options.urlUser;
    this._urlCards = options.urlCards;
    this._urlAvatar = options.urlAvatar;
    this._newCards = options.newCards;
  }
  //Проверка ответа сервера и преобразование из json
  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  //Загрузка карточек с сервера
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}${this._urlCards}`, {
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(response);
  }

  //Загрузка информации о пользователе с сервера
  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}${this._urlUser}`, {
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(response);
  }
  // Редактирование профиля  пользователя на сервере
  async patchUserInfo(data) {
    const response = await fetch(`${this._baseUrl}${this._urlUser}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
    return this._getResponseData(response);
  }
  // Редактирование аватара  пользователя на сервере
  async patchUserAvatar(data) {
    const response = await fetch(`${this._baseUrl}${this._urlAvatar}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
    return this._getResponseData(response);
  }
  //Добавление новой карточки на сервер
  async postNewCard(data) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
    return this._getResponseData(response);
  }
  //Удаление карточки на сервере
  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(response);
  }

  //Добавление лайка на сервере
  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(response);
  }
  //Удаление лайка на сервере
  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}${this._urlCards}/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(response);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.putLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }
}
export const api = new Api(optionsApi);
