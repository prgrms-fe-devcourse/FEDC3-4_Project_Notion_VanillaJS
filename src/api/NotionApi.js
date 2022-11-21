import { request } from './request.js';
const base = '/documents';

const NotionApi = {
  async getRootDocuments() {
    return await request(base, { method: 'GET' });
  },
  async getDocument(id) {
    return await request(`${base}/${id}`, { method: 'GET' });
  },
  async createDocument(body) {
    return await request(base, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  async editDocument(id, body) {
    return await request(`${base}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },
  async removeDocument(id) {
    return await request(`${base}/${id}`, {
      method: 'DELETE',
    });
  },
};

export default NotionApi;
