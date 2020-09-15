import { renderLoading } from "./utils.js";

class Api {
  constructor({ address, token, groupId }) {
    // стандартная реализация -- объект options
    this._token = token;
    this._groupId = groupId;
    this._address = address;

    // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Загрузка карточек: ${err}`))
  }

  getUsers() {
    return fetch(`${this._address}/${this._groupId}/users`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Загрузка друзей: ${err}`))
  }

  addCard({ name, link }) {
    // renderLoading(true);

    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))      
      .catch(err => console.log(`Добавление карточки: ${err}`));
  }

  removeCard(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`При удалении карточки: ${err}`));
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Загрузка информации о пользователе: ${err}`))
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`При обновлении информации о пользователе: ${err}`));
  }

  setUserAvatar({ avatar }) {
    renderLoading(true);

    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`При изменении аватара пользователя: ${err}`));
  }

  changeLikeCardStatus(cardID, like) {
    
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._address}/${this._groupId}/cards/like/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(`Изменения статуса лайка: ${err}`));
  }
}

const api = new Api({
  address: 'https://nomoreparties.co',
  groupId: `cohort9`,
  token: `0f96e3cb-2b6c-4da4-8233-9011a7d4981c`,
})

export default api;


// address: 'https://praktikum.tk',
//   groupId: `cohort0`,
//   token: `80a75492-21c5-4330-a02f-308029e94b63`,