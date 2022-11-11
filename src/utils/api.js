import { API_END_POINT } from '../url.js';
import { USER_NAME } from './constants.js';

export const request = async (url, options = {}, data) => {
  const res = await fetch(`${API_END_POINT}${url[0] === '/' ? url : `/${url}`}`, {
    ...options,
    headers: {
      'x-username': USER_NAME,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(`${res.status} Error`);
  }
};
