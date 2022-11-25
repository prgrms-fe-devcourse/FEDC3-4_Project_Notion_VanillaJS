import request from './baseConfig.js';

const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

const getRootDocuments = async () => {
  return await request({
    options: {
      method: HTTP_METHODS.GET,
    },
  });
};

const getContentOfDocument = async id => {
  return await request({
    url: id,
    options: {
      method: HTTP_METHODS.GET,
    },
  });
};

const createDocument = async ({ title = '제목 없음', parent = null }) => {
  return await request({
    options: {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({
        title,
        parent,
      }),
    },
  });
};

const updateDocument = async (id, { title, content }) => {
  return await request({
    url: id,
    options: {
      method: HTTP_METHODS.PUT,
      body: JSON.stringify({
        title,
        content,
      }),
    },
  });
};

const deleteDocument = async id => {
  return await request({
    url: id,
    options: {
      method: HTTP_METHODS.DELETE,
    },
  });
};

export {
  getRootDocuments,
  getContentOfDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};
