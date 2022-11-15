import DocumentList from './DocumentList.js';

import { fetchDocuments } from '../utils/api.js';
import { isNew } from '../utils/helper.js';

export default function Sidebar({ $target }) {
  isNew(new.target);

  const $sidebar = document.createElement('div');
  $sidebar.className = 'sidebar';

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
    onRemove: async (documentId) => {
      await fetchDocuments(documentId, {
        method: 'DELETE',
      });
      this.render();
    },
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState(documents);
  };

  this.render();
}
