const API_END_POINT = process.env.API_END_POINT
const X_USERNAME = 'minjong';

export const request = async (path, options = {}) => {
  try {
    const url = `${API_END_POINT}${path}`;
    const res = await fetch(url, { 
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