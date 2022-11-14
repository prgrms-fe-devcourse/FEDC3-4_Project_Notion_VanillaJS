import { API_END_POINT, HEADERS } from "./constants.js";

export const fetchData = async (
  url,
  method = "GET",
  data,
  defaultValue = []
) => {
  try {
    const response = await fetch(API_END_POINT + url, {
      method,
      headers: HEADERS,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json, "데이터 패치 완료");
      return json;
    }

    return defaultValue;
  } catch (e) {
    console.log(e.message);
  }
};
