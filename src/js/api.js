import { HIDDEN_API_URL } from "./apiUrl.js";

export const API_END_POINT = HIDDEN_API_URL;

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "parkmh",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리중 뭔가 이상합니다!");
  } catch (e) {
    alert(e.message);
  }
};
