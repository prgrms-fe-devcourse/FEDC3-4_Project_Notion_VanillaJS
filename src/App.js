import Post from './components/Post/PostComponent.js';
import Sidebar from './components/Sidebar/SidebarComponent.js';
import {
  createDocument,
  deleteDocument,
  getContentOfDocument,
  getRootDocuments,
} from './utils/api/apis.js';
import changeBackgroundColor from './utils/helpers/changeBackgroundColorOfSelectedItem.js';
import { createElement } from './utils/helpers/createElement.js';
import { initRouter, historyReplace, historyPush } from './utils/helpers/router.js';
import { modifyStorage } from './utils/helpers/storage.js';

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
    sidebar.setState([...this.state.rootDocuments]);
  };

  this.route = async () => {
    const { pathname, search } = window.location;
    const [, , id] = pathname.split('/');
    const queryString = new URLSearchParams(search);

    try {
      // id가 존재하면 post를 정상적으로 렌더링
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

      // 목록이 추가되거나 삭제되는 등 sidebar도 반영하기 위함.
      // 이걸 해줘야 DocumentList가 새로 렌더링됨.
      this.setState({
        ...this.state,
      });
    } catch (error) {
      // 위 과정 중 에러가 발생하면 Home으로 돌아가기 위함.
      history.replaceState(null, null, '/');
      post.setState({
        ...post.state,
        id: undefined,
        currentPath: 'Metamong',
        subDocuments: [],
      });
    } finally {
      changeBackgroundColor('selected', id);
    }
  };

  this.init = async () => {
    const rootDocuments = await getRootDocuments();
    this.setState({
      ...this.state,
      rootDocuments,
    });

    this.route();
    initRouter(async () => {
      this.route();
    });
  };

  const sidebar = new Sidebar({
    $target: $main,
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
      modifyStorage.add(id);
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

      modifyStorage.delete(id);
      await deleteDocument(id);
      const nextRootDocuments = await getRootDocuments();
      this.setState({
        ...this.state,
        rootDocuments: nextRootDocuments,
      });

      // 현재 보고 있는 문서를 삭제할 시 Home으로 리다이렉팅.
      const [, , currentId] = window.location.pathname.split('/');
      if (id === currentId) historyPush('/');
    },
    onClickDocumentItemToggleButton: id => {
      modifyStorage.toggle(id);
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
}
