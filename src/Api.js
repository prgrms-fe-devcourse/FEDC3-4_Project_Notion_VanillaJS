import { API_END_POINT } from "./Address.js";
import { push } from "./router.js";

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
    throw new Error(`${options.method} fetch fail`);
  } catch (e) {
    alert(`${e.message} 메인 화면으로 이동합니다.`);
    push("/");
  }
};
