import { API_END_POINT } from "../../baseUrl.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        "x-username": "hyejun",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 오류");
  } catch (e) {
    console.error(e);
  }
};
