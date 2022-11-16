import { API_END_POINT, HEADER } from "./apiConstans.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": HEADER,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리중 뭔가 이상합니다!");
  } catch (error) {
    alert(error.message);
  }
};
