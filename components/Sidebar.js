import { request } from '../util/api.js';
import { push } from '../util/route.js';
import DocumentList from './DocumentList.js';

const ADD_DOCUMENT_BUTTON = 'add-document-button';
const DOCUMENT_HEADER = 'documents-header';

export default function Sidebar({ $target }) {
  const $element = document.createElement('div');
  $element.className = 'sidebar';
  $element.innerHTML = `<div class="${DOCUMENT_HEADER}">My Documents<button class="${ADD_DOCUMENT_BUTTON}" type="button">+</button></div>`;

  $target.appendChild($element);

  this.setState = async () => {
    const documents = await request('/documents');
    documentList.setState(documents);
  }

  $element.addEventListener('click', async (e) => {
    if (e.target.className === DOCUMENT_HEADER) {
      push('/');
    } else if (e.target.className === ADD_DOCUMENT_BUTTON) {
      await request(`/documents`, {
        method: 'POST',
        body: JSON.stringify({ parent: null, title: '' })
      });
      this.setState();
    }
  });

  const documentList = new DocumentList({
    $target: $element,
    initialState: [],
    onDocumentClick: async (id) => {
      push(`/documents/${id}`);
    },
    onAddSubDocumentButtonClick: async (parentId) => {
      await request(`/documents`, {
        method: 'POST',
        body: JSON.stringify({ parent: Number(parentId), title: '' })
      });
      this.setState();
    },
    onRemoveDocumentButtonClick: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE'
      });
      this.setState();
    }
  });
}