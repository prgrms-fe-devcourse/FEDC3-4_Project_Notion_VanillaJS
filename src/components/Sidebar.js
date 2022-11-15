import DocumentList from './DocumentList.js';
import DocumentAddButton from './DocumentAddButton.js';

import { fetchDocuments } from '../utils/api.js';
import { isNew } from '../utils/helper.js';
import { NEW, NEW_PARENT, ROUTE_DOCUMENTS } from '../utils/constants.js';
import { setItem } from '../utils/storage.js';
import { push } from '../utils/router.js';

export default function Sidebar({ $target }) {
  isNew(new.target);

  const $sidebar = document.createElement('div');
  $sidebar.className = 'sidebar';

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
    onRemove: async (documentId) => {
      if (confirm('페이지를 삭제하시겠습니까?')) {
        await fetchDocuments(documentId, {
          method: 'DELETE',
        });
        this.render();
      }
    },
  });

  new DocumentAddButton({
    $target: $sidebar,
    initialState: {
      position: 'document-list-bottom',
      text: '페이지 추가',
    },
    onClick: () => {
      setItem(NEW_PARENT, null);
      push(`${ROUTE_DOCUMENTS}/${NEW}`);
    },
  });

  new DocumentAddButton({
    $target: $sidebar,
    initialState: {
      position: 'sidebar-bottom',
      text: '새 페이지',
    },
    onClick: () => {
      setItem(NEW_PARENT, null);
      push(`${ROUTE_DOCUMENTS}/${NEW}`);
    },
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState(documents);
  };

  this.render();
}
