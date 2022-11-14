import { API_END_POINT } from '../lib/apiEndPoint.js';

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'roto',
      },
    });

    if (response.ok) {
      return await response.json();
    }
    throw new Error('API 처리 중 오류가 발생했습니다.');
  } catch (e) {
    alert(e.message);
  }
};
