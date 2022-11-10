const API_END_POINT = '';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-type': 'application/json',
        'x-username': 'kimyuri',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 처리 중 뭔가 이상합니다!');
  } catch (e) {
    alert(e.message);
  }
};
