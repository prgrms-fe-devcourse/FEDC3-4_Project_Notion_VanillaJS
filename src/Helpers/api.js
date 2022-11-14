import { API_END_POINT, USERNAME } from '../../endpoint.js';
import { routeChange } from './router.js';

export const getDocumentAll = async () => {
  const res = await fetch(`${API_END_POINT}`, {
    headers: {
      'x-username': USERNAME,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }

  return await res.json();
};

export const getDocumentById = async ({ id }) => {
  const res = await fetch(`${API_END_POINT}${id}`, {
    headers: {
      'x-username': USERNAME,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('올바르지 않은 접속입니다. 최상단 폴더로 돌아갑니다.');
    routeChange('/');
    location.reload();
  }

  return await res.json();
};

export const postDocument = async ({ title, parent = null }) => {
  const res = await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {
      'x-username': USERNAME,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      parent,
    }),
  });

  if (!res.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }

  return await res.json();
};

export const putDocument = async ({ id, title, content }) => {
  const res = await fetch(`${API_END_POINT}${id}`, {
    method: 'PUT',
    headers: {
      'x-username': USERNAME,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }
};

export const deleteDocument = async ({ id }) => {
  const res = await fetch(`${API_END_POINT}${id}`, {
    method: 'DELETE',
    headers: {
      'x-username': USERNAME,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }
};
