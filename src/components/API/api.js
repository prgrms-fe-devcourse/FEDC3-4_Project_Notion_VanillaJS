import { API_ENDPOINT, API_X_USERNAME } from "./config.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        "x-username": API_X_USERNAME,
        "Content-type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Could not fetch data!! (${res.status})`);

    return await res.json();
  } catch (e) {
    alert(e.message);
  }
};

export const getDocument = async (documentId) => {
  return await request(`${documentId ? `/${documentId}` : ""}`);
};

export const createDocument = async (document) => {
  return await request("", {
    method: "POST",
    body: JSON.stringify(document),
  });
};

export const editDocument = async ({ documentId, document }) => {
  return await request(`/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(document),
  });
};

export const deleteDocument = async (documentId) => {
  return await request(`/${documentId}`, {
    method: "DELETE",
  });
};
