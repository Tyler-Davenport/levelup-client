/* eslint-disable no-unused-vars */
import { clientCredentials } from '../client';

const getGames = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createGame = (game) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(resolve)
      .catch(reject);
  });

const getGameTypes = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/gametypes`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
const updateGame = (game, id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })
      .then(async (res) => {
        // Only attempt to parse JSON if response has content
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(resolve)
      .catch(reject);
  });

const getSingleGame = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`)
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(resolve)
      .catch(reject);
  });
const deleteGame = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'DELETE',
    })
      .then((res) => (res.ok ? resolve(true) : reject(new Error('Failed to delete game'))))
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export
export { createGame, deleteGame, getGames, getGameTypes, getSingleGame, updateGame };
