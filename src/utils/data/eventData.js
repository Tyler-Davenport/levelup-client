import { clientCredentials } from '../client';

const getEvents = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

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

// Export both functions
export { createEvent, deleteEvent, getEvents, getSingleEvent, updateEvent };
