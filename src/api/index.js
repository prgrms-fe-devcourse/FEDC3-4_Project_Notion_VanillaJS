import { API_ENDPOINT } from '../../.env.js';

const request = async (url, options = {}) => {
  try {
    const data = await fetch(`${API_ENDPOINT}/ㅌ${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'myeongjae',
      },
    });

    if (data.ok) {
      return data.json();
    }

    throw new Error(`잘못된 API를 사용하고 있습니다.`);
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export default request;
