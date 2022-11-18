import request from './index.js';

const STATIC_URL = 'documents';

const createDocument = async id => {
  try {
    return await request(`documents/${id}`);
  } catch (error) {
    console.error(error.message);
  }
};

const readRootDocuments = async () => {
  try {
    return await request(STATIC_URL);
  } catch (error) {
    console.error(error.message);
  }
};

const readDocument = () => {};

const updateDocument = async (id, title, content) => {
  await request(`${STATIC_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
  });
};

const deleteDocument = () => {};

export {
  createDocument,
  readRootDocuments,
  readDocument,
  updateDocument,
  deleteDocument,
};
