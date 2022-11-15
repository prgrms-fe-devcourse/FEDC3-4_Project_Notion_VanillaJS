import { apiKey, API_END_POINT } from '../apiKey.js';

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        'Content-Type': 'application/json',
        'x-username': apiKey,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 통신 중 에러 발생');
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchDocumentList = async () => {
  return await request('/');
};
