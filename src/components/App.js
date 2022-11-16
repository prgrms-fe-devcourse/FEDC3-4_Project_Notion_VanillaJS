import Sidebar from './Sidebar/Sidebar.js';
import DocumentEditPage from './DocumentEditPage/DocumentEditPage.js';

import {
  DEFAULT_DOCUMENT_ID,
  NEW,
  NEW_PARENT,
  OPENED_ITEMS,
  ROUTE_DOCUMENTS,
} from '../utils/constants.js';
import { isNew, setDocumentTitle } from '../utils/helper.js';
import { initRouter, push } from '../utils/router.js';
import { fetchDocuments } from '../utils/api.js';
import { getItem, removeItem, setItem } from '../utils/storage.js';

export default function App({ $target }) {
  isNew(new.target);

  let timer = null;

  const onAdd = async () => {
    push(`${ROUTE_DOCUMENTS}/${NEW}`);

    const createdDocument = await fetchDocuments('', {
      method: 'POST',
      body: JSON.stringify({
        title: '',
        parent: getItem(NEW_PARENT, null),
      }),
    });

    history.replaceState(
      null,
      null,
      `${ROUTE_DOCUMENTS}/${createdDocument.id}`
    );
    removeItem(NEW_PARENT);

    documentEditPage.setState({ documentId: createdDocument.id });

    sidebar.setState({
      selectedId: parseInt(createdDocument.id),
    });
  };

  const onDelete = async (documentId) => {
    if (documentId === DEFAULT_DOCUMENT_ID) {
      alert('첫 페이지는 지우지 말아주세요 :D');
      return;
    }

    if (!confirm('페이지를 삭제하시겠습니까?')) return;

    await fetchDocuments(documentId, {
      method: 'DELETE',
    });

    const openedItems = getItem(OPENED_ITEMS, []);
    const index = openedItems.indexOf(documentId);
    if (index > -1) {
      setItem(OPENED_ITEMS, [
        ...openedItems.slice(0, index),
        ...openedItems.slice(index + 1),
      ]);
    }

    const currentId = documentEditPage.state.documentId;
    if (currentId === documentId) {
      documentEditPage.setState({ documentId: DEFAULT_DOCUMENT_ID });
      push(`${ROUTE_DOCUMENTS}/${DEFAULT_DOCUMENT_ID}`);
    } else {
      documentEditPage.setState({ documentId: currentId });
    }

    sidebar.render();
  };

  const onEdit = ({ id, title, content }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const editedDocument = await fetchDocuments(id, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
      });

      documentEditPage.setState({
        documentId: editedDocument.id,
        document: editedDocument,
      });

      sidebar.render();
    }, 1000);
  };

  const sidebar = new Sidebar({
    $target,
    initialState: {
      selectedId: null,
    },
    onAdd,
    onDelete,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: '',
        content: '',
      },
    },
    onDelete,
    onEdit,
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      setDocumentTitle('Notion');
      return;
    }

    if (pathname.indexOf(ROUTE_DOCUMENTS) !== 0) return;

    const [, , documentId] = pathname.split('/');
    documentEditPage.setState({
      documentId: isNaN(documentId) ? documentId : parseInt(documentId),
    });

    if (!isNaN(documentId)) {
      sidebar.setState({
        selectedId: parseInt(documentId),
      });
    }
  };

  window.addEventListener('popstate', () => this.route());

  this.route();

  initRouter(() => this.route());
}
