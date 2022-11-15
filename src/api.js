export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        "Content-type": "application/json",
        "x-username": "guno",
      },
    });
    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 오류");
  } catch (e) {
    console.log(e.message);
  }
};
