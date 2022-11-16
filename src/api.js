import { API_END_POINT } from "./apiUrl.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "euna",
      },
    });
    if (res.ok) return await res.json();

    throw new Error("API 호출 오류!");
  } catch (e) {
    alert(e);
  }
};
