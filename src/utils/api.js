import { API_KEY, API_HEADER, API_HEADER_NAME } from "../../constants.js";

const API_PREFIX = API_KEY;

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_PREFIX}${url}`, {
      ...option,
      headers: {
        "content-Type": "application/json",
        "x-username": API_HEADER_NAME,
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리 오류");
  } catch (error) {
    throw new Error(error.message);
  }
};
