import { request } from './api.js';
import { documentsUrl } from './util.js';

export const putTitleMethod = (id, title) => {
  return request(`${documentsUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: title,
    }),
  });
};

export const putContentMethod = (id, content) => {
  return request(`${documentsUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      content: content,
    }),
  });
};

export const addMethod = (id) => {
  return request(`${documentsUrl}`, {
    method: 'POST',
    body: JSON.stringify({
      title: '',
      parent: id,
    }),
  });
};

export const addHeaderMethod = (documentsUrl) => {
  return request(`${documentsUrl}`, {
    method: 'POST',
    boyd: JSON.stringify({
      title: '',
      parent: null,
    }),
  });
};

export const deleteMethod = (id) => {
  return request(`${documentsUrl}/${id}`, {
    method: 'DELETE',
  });
};
