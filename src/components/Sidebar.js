import DocumentList from './DocumentList.js';
import DocumentAddButton from './DocumentAddButton.js';

import { fetchDocuments } from '../utils/api.js';
import { isNew } from '../utils/helper.js';

export default function Sidebar({ $target, onAdd, onDelete }) {
  isNew(new.target);

  const $sidebar = document.createElement('div');
  $sidebar.className = 'sidebar';

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
    },
    onAdd,
    onDelete,
  });

  new DocumentAddButton({
    $target: $sidebar,
    initialState: {
      position: 'document-list-bottom',
      text: '페이지 추가',
    },
    onAdd,
  });

  new DocumentAddButton({
    $target: $sidebar,
    initialState: {
      position: 'sidebar-bottom',
      text: '새 페이지',
    },
    onAdd,
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState({ documents });
  };

  this.render();
}
