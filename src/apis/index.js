import { API_END_POINT, HEADERS } from "./baseUrl.js";

export const request = async (url, method = "GET", data, defaultValue = []) => {
  try {
    const response = await fetch(API_END_POINT + url, {
      method,
      headers: HEADERS,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }

    return defaultValue;
  } catch (e) {
    console.log(e.message);
  }
};
