import { API_END_POINT } from "./Address.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
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
