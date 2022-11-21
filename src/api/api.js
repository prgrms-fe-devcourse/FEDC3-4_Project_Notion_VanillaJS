import { request } from "./index.js";

export const getRootDouments = async () => {
  return await request("/documents");
};

export const getDocumentContent = async (documentId) => {
  return await request(`/documents/${documentId}`);
};

export const createDocument = async (documentData) => {
  return await request(`/documents`, {
    method: "POST",
    body: JSON.stringify(documentData),
  });
};

export const modifyDocuments = async (documentId, documentData) => {
  return await request(`/documents/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(documentData),
  });
};

export const deleteDocument = async (documentId) => {
  return await request(`/documents/${documentId}`, {
    method: "DELETE",
  });
};
