import { CONFIG } from "../../config";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _makeRequest(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //  GET - Buscar dados
  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //  POST - Criar novo card
  createCard(data) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  //  PATCH - Atualizar perfil
  setUserInfo(data) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // PATCH - Atualizar Avatar
  updateAvatar(data) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // DELETE - Remover card
  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  // PUT - Substituir/Toggle
  likeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.unlikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }
}

export const api = new Api({
  baseUrl: CONFIG.BASE_URL,
  headers: {
    authorization: CONFIG.API_TOKEN,
    "Content-Type": "application/json",
  },
});
