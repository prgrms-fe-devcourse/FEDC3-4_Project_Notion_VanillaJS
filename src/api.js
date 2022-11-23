export const BASE_URL = 'https://kdt-frontend.programmers.co.kr';

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'x-username': 'jwong' },
    });

    if (response.ok) {
      // TODO await 빼면 어떻게 되는지 확인해보기
      return await response.json();
    }
    throw new Error('API 요청에 문제가 생겼습니다.');
  } catch (e) {
    alert(e.message);
  }
};
