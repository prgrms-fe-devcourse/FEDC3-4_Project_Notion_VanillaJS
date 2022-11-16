import { ERROR_API_CALL } from "../components/utils/constants.js";
import { API_END_POINT, USERNAME } from "./api_constant.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": `${USERNAME}`,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    // throw new Error(ERROR_API_CALL);
  } catch (e) {
    // alert(e.message);
  }
};
