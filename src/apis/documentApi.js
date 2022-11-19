import { request } from "./index.js";

export const getRootDocuments = async () => {
  const response = await request("/documents");
  return response;
};

export const createNewDocument = async (data) => {
  const response = await request("/documents", "POST", data);
  return response;
};

export const getDocumentDetail = async (documentId) => {
  const response = await request(`/documents/${documentId}`);
  return response;
};

export const updateDocument = async (documentId, data) => {
  const response = await request(`/documents/${documentId}`, "PUT", data);
  return response;
};

export const deleteDocument = async (documentId) => {
  const response = await request(`/documents/${documentId}`, "DELETE");
  return response;
};
