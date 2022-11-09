const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents/";
const USERNAME = "zerosial";

export const getDocumentAll = async () => {
  const res = await fetch(`${API_END_POINT}`, {
    headers: {
      "x-username": USERNAME,
    },
  });

  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }

  return await res.json();
};

export const getDocumentById = async ({ id }) => {
  const res = await fetch(`${API_END_POINT}${id}`, {
    headers: {
      "x-username": USERNAME,
    },
  });

  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }

  return await res.json();
};

export const postDocument = async ({ title, parent = null }) => {
  const res = await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: {
      "x-username": USERNAME,
    },
    body: JSON.stringify({
      title,
      parent,
    }),
  });

  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
};

export const putDocument = async ({ id, title, content }) => {
  const res = await fetch(`${API_END_POINT}${id}`, {
    method: "PUT",
    headers: {
      "x-username": USERNAME,
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
};

export const deleteDocument = async ({ id }) => {
  const res = await fetch(`${API_END_POINT}${id}`, {
    method: "DELETE",
    headers: {
      "x-username": USERNAME,
    },
    body: JSON.stringify({
      title,
      parent,
    }),
  });

  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
};
