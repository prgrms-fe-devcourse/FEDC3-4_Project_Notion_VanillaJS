import { API_END_POINT } from "../../api-endpoint.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "dmswl12345",
      },
    });

    if (!res.ok) {
      throw new Error("API 처리 중");
    }

    return res.json();
  } catch (err) {
    console.error(err);
    history.replaceState(null, null, "/404");
    window.location = `${window.location.origin}/404`;
  }
};
