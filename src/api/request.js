import API_END_POINT from './apiEndPoint.js';
import { USER_NAME } from '../lib/constants.js';

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': USER_NAME,
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
