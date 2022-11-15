import { API_END_POINT } from "./API_END_POINT.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "DevSoonyo",
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API query error");
  } catch (e) {}
};
