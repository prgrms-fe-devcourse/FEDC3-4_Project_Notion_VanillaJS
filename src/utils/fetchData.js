import { request } from "./api.js";

export const getRootDocuments = async () => {
  const data = await request("/documents");
  return data;
};

export const createNewDocument = async (data) => {
  await request("/documents", "POST", data);
};

export const getDocumentDetail = async (documentId) => {
  const data = await request(`/documents/${documentId}`);
  return data;
};
