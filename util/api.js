const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
const X_USERNAME = 'minjong';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, { 
      ...options, 
      headers: {
        'x-username' : X_USERNAME,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error('서버와 통신 중 문제가 발생했습니다');
  } catch {
    console.error(e.message);
  }
}