import { clientCredentials } from '../client';

const getEvents = (uid) =>
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  }).then((res) => res.json());

const createEvent = (event) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(resolve)
      .catch(reject);
  });

const updateEvent = (event, id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(resolve)
      .catch(reject);
  });

const getSingleEvent = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${id}`)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

const deleteEvent = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${id}`, {
      method: 'DELETE',
    })
      .then((res) => (res.ok ? resolve(true) : reject(new Error('Failed to delete event'))))
      .catch(reject);
  });

const endpoint = `${clientCredentials.databaseURL}/events`;

export const joinEvent = (eventId, uid) =>
  fetch(`${endpoint}/${eventId}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid, // ← no Bearer/Token prefix
    },
    body: JSON.stringify({ user_id: uid }), // Use user_id to match backend
  }).then((res) => res.json());

export const leaveEvent = (eventId, uid) =>
  fetch(`${endpoint}/${eventId}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify({ user_id: uid }), // Send user_id in body for backend compatibility
  });

// Export both functions
export { createEvent, deleteEvent, getEvents, getSingleEvent, updateEvent };
