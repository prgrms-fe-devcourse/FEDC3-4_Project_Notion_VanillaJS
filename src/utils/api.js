import { API_END_POINT } from './apiUrl.js';

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        'x-username': 'hwa',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    alert(e.message);
  }
};