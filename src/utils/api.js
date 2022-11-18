import { API_END_POINT, USER_NAME } from "../../.env.js";
import { navigate } from "./navigate.js";

const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": USER_NAME,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error("error", error);
    navigate("/", true);
  }
};

const API = {
  getDocuments: async (id = "") => {
    const url = id ? `/${id}` : "";
    return await request(`/documents${url}`, { method: "GET" });
  },
  createDocument: async (title, parent = null) => {
    return await request("/documents", {
      method: "POST",
      body: JSON.stringify({ title, parent }),
    });
  },
  updateDocument: async (id, newDocument) => {
    const { title, content } = newDocument;
    return await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });
  },
  deleteDocument: async (id) => {
    return await request(`/documents/${id}`, {
      method: "DELETE",
    });
  },
};

export default API;
