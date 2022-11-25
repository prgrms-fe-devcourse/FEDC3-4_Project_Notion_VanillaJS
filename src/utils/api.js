import { API_END_POINT } from "../../apiUrl.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "yjZero",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리 실패");
  } catch (e) {
    alert(e.message);
  }
};
