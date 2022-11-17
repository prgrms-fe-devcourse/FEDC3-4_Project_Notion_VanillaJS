import Post from './components/Post/PostComponent.js';
import Sidebar from './components/Sidebar/SidebarComponent.js';
import {
  createDocument,
  deleteDocument,
  getContentOfDocument,
  getRootDocuments,
} from './utils/api/apis.js';
import { createElement } from './utils/createElement.js';
import { initRouter, historyReplace, historyPush } from './utils/router.js';
import { getItem, OPENED_DOCUMENT_ITEMS, setItem } from './utils/storage.js';

/**
 * state: {
 * 	rootDocuments: array,
 * 	currentPath: string,
 * 	id: string | number
 * }
 */
export default function App({ $target, initialState }) {
  const $main = createElement({ element: 'main', $target });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    sidebar.setState(this.state.rootDocuments);
  };

  this.route = async () => {
    const { pathname, search } = window.location;
    const [, , id] = pathname.split('/');
    // todo : 모듈화 필요
    const queryString = new URLSearchParams(search);

    // todo : 존재하지 않는 id이면 Home으로 리다이렉팅 필요
    try {
      if (id) {
        const {
          title,
          content,
          documents: subDocuments,
        } = await getContentOfDocument(id);

        post.focus();
        post.setState({
          id,
          currentPath: queryString.get('currentPath'),
          title,
          content,
          subDocuments,
        });
      } else {
        post.setState({
          ...post.state,
          id: undefined,
          currentPath: 'Metamong',
          subDocuments: [],
        });
      }

      this.setState({
        ...this.state,
      });
    } catch (error) {
      history.replaceState(null, null, '/');
      post.setState({
        ...post.state,
        id: undefined,
        currentPath: 'Metamong',
        subDocuments: [],
      });
    } finally {
      // todo : 모듈화 필요
      document.querySelector('.selected')?.classList.remove('selected');
      if (document.querySelector(`[data-id='${id}']`))
        document.querySelector(`[data-id='${id}']`).classList.add('selected');
      else document.querySelector('header').classList.add('selected');
    }
  };

  this.init = async () => {
    const rootDocuments = await getRootDocuments();
    this.setState({
      ...this.state,
      rootDocuments,
    });
    this.route();
  };

  const sidebar = new Sidebar({
    $target: $main,
    // todo : 모듈화 필요
    onClickRootAddButton: async () => {
      const createdDocument = await createDocument({ title: '제목 없음' });
      const nextRootDocuments = await getRootDocuments();
      this.setState({
        ...this.state,
        rootDocuments: nextRootDocuments,
      });
      historyPush(
        `/documents/${createdDocument.id}?currentPath=${createdDocument.title}`,
      );
    },
    onClickDocumentItemAddButton: async (id, currentPath) => {
      const openedDocumentItemIds = getItem(OPENED_DOCUMENT_ITEMS, []);
      if (!openedDocumentItemIds.includes(id))
        setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds, id]);
      const createdDocument = await createDocument({ parent: id });
      const nextRootDocuments = await getRootDocuments();
      this.setState({
        ...this.state,
        rootDocuments: nextRootDocuments,
      });
      historyPush(
        `/documents/${createdDocument.id}?currentPath=${currentPath} > ${createdDocument.title}`,
      );
    },
    onClickDocumentItemDeleteButton: async id => {
      if (!confirm('해당 문서를 삭제하시겠습니까?')) return;

      const openedDocumentItemIds = getItem(OPENED_DOCUMENT_ITEMS, []);
      const [, , currentId] = window.location.pathname.split('/');
      const removedOpenedDocumentItemIdIndex = openedDocumentItemIds.findIndex(
        openedDocumentItemId => openedDocumentItemId === id,
      );
      if (removedOpenedDocumentItemIdIndex !== -1)
        openedDocumentItemIds.splice(removedOpenedDocumentItemIdIndex, 1);
      setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds]);
      await deleteDocument(id);
      const nextRootDocuments = await getRootDocuments();
      this.setState({
        ...this.state,
        rootDocuments: nextRootDocuments,
      });
      if (id === currentId) historyPush('/');
    },
    onClickDocumentItemToggleButton: id => {
      const openedDocumentItemIds = getItem(OPENED_DOCUMENT_ITEMS, []);
      if (openedDocumentItemIds.includes(id)) {
        const removedOpenedDocumentItemIdIndex =
          openedDocumentItemIds.findIndex(
            openedDocumentItemId => openedDocumentItemId === id,
          );
        if (removedOpenedDocumentItemIdIndex !== -1)
          openedDocumentItemIds.splice(removedOpenedDocumentItemIdIndex, 1);
        setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds]);
      } else {
        setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds, id]);
      }

      this.setState({
        ...this.state,
      });
    },
  });
  const post = new Post({
    $target: $main,
    initialState,
    onChangeTitle: async (id, changedCurrentPath) => {
      const nextRootDocuments = await getRootDocuments();
      this.setState({
        ...this.state,
        rootDocuments: nextRootDocuments,
      });
      historyReplace(`/documents/${id}?currentPath=${changedCurrentPath}`);
    },
  });

  this.init();
  initRouter(async () => {
    this.route();
  });
}
