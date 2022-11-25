import { API_ERROR_MESSAGES } from '../constants/errorMessages.js';

const BASE_URL = 'https://kdt-frontend.programmers.co.kr/documents';

const request = async ({ url = '', options = {} }) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'jun',
      },
    });

    if (response.ok) return await response.json();

    throw new Error(API_ERROR_MESSAGES.REQUEST);
  } catch (error) {
    console.log(error.message);
  }
};

export default request;
