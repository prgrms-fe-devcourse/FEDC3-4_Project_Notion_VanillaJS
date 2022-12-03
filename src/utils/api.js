import { API_END_POINT } from './variable.js';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'dayeon',
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 처리 오류');
  } catch (e) {
    alert(e.message);
  }
};
