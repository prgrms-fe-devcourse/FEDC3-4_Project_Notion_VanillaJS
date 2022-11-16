import { routeChange } from './router.js';
import { getUserIdToAdress } from './getUserIdToAdress.js';
import { API_END_POINT } from '../../endpoint.js';
import { BASE_INIT_USERNAME, CONTENT_TYPE, ERROR_MESSAGE } from '../constants.js';

export const getDocumentAll = async () => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${API_END_POINT}`, {
    headers: {
      'x-username': userId ? userId : BASE_INIT_USERNAME,
      'Content-Type': CONTENT_TYPE,
    },
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.NOT_COLLECT_NETWORK, res);
  }

  return await res.json();
};

export const getDocumentById = async ({ id }) => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${API_END_POINT}${id}`, {
    headers: {
      'x-username': userId ? userId : BASE_INIT_USERNAME,
      'Content-Type': CONTENT_TYPE,
    },
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
  const res = await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {
      'x-username': userId ? userId : BASE_INIT_USERNAME,
      'Content-Type': CONTENT_TYPE,
    },
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
  const res = await fetch(`${API_END_POINT}${id}`, {
    method: 'PUT',
    headers: {
      'x-username': userId ? userId : BASE_INIT_USERNAME,
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.NOT_COLLECT_NETWORK, res);
  }
};

export const deleteDocument = async ({ id }) => {
  const userId = getUserIdToAdress();
  const res = await fetch(`${API_END_POINT}${id}`, {
    method: 'DELETE',
    headers: {
      'x-username': userId ? userId : BASE_INIT_USERNAME,
      'Content-Type': CONTENT_TYPE,
    },
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.NOT_COLLECT_NETWORK, res);
  }
};
