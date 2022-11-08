const API_END_POINT = "https://kdt-frontend.programmers.co.kr/";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "ajk",
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("fetch fail");
  } catch (e) {
    alert(e.message);
  }
};
