import { API_END_POINT } from "./url.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "zena",
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 호출 에러 발생");
  } catch (error) {
    alert(error.message);
  }
};
