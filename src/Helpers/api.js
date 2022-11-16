import { routeChange } from './router.js';
import { ERROR_MESSAGE, API_HEADER } from '../constants.js';
import { getUserIdToAdress } from './getUserIdToAdress.js';

export const getDocumentAll = async () => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${process.env.API_END_POINT}`, {
    headers: API_HEADER(userId),
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.NOT_COLLECT_NETWORK, res);
  }

  return await res.json();
};

export const getDocumentById = async ({ id }) => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${process.env.API_END_POINT}${id}`, {
    headers: API_HEADER(userId),
  });

  if (!res.ok) {
    alert(ERROR_MESSAGE.NOT_COLLECT_ADRESS);
    routeChange('/');
    location.reload();
  }

  return await res.json();
};

export const postDocument = async ({ title, parent = null }) => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${process.env.API_END_POINT}`, {
    method: 'POST',
    headers: API_HEADER(userId),
    body: JSON.stringify({
      title,
      parent,
    }),
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.NOT_COLLECT_NETWORK, res);
  }

  return await res.json();
};

export const putDocument = async ({ id, title, content }) => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${process.env.API_END_POINT}${id}`, {
    method: 'PUT',
    headers: API_HEADER(userId),
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.NOT_COLLECT_NETWORK, res);
  }
};

export const deleteDocument = async ({ id }) => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${process.env.API_END_POINT}${id}`, {
    method: 'DELETE',
    headers: API_HEADER(userId),
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.NOT_COLLECT_NETWORK, res);
  }
};
