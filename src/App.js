import NotionApi from './api/NotionApi.js';
import EditorPage from './component/Editor/EditorPage.js';
import ModalPage from './component/Modal/ModalPage.js';
import SideBarPage from './component/SideBar/SideBarPage.js';
import { initRouter, push } from './lib/router.js';
import { setSideBarDOM } from './lib/storage.js';

export default function App({ $target }) {
  let isInitialize = false;
  this.state = {
    list: [],
    id: '',
    title: '',
    content: '',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    if (!isInitialize) {
      sidebarPage.setState(this.state.list);
      isInitialize = true;
    }
  };

  const getData = async () => {
    const data = await NotionApi.getRootDocuments();
    const nextState = [...data];
    this.setState({
      ...this.state,
      list: nextState,
    });
  };

  // Page
  const sidebarPage = new SideBarPage({
    $target,
    initialState: {},
    getData,
    setEditor: (id = '', title = '', content = '') => {
      editorPage.setState({
        ...this.state,
        id,
        title,
        content,
      });
    },
  });

  const editorPage = new EditorPage({
    $target,
    initialState: {
      id: '',
      title: '',
      content: '',
    },
  });

  new ModalPage({
    $target,
    initialState: {},
    // 타이틀이 없거나 제목 없음일 경우 리스트에서 삭제.
    clearUntitledDocument: () => {
      sidebarPage.removeUntitledDocument();
    },

    // 타이틀이 있으면 해당 RootDocument 추가
    postDocument: async (title, content, id) => {
      const { createDocument, editDocument } = NotionApi;
      // 타이틀과 Id로 데이터 추가
      const postData = await createDocument({
        title,
        parent: id,
      });
      // 추가한 데이터로 화면 리렌더링
      await getData();
      // 해당 데이터 id의 내용 수정해놓기
      await editDocument(postData.id, { title, content });
      // id가 new 인 것 새 아이디로 교체
      sidebarPage.switchNewId(postData.id);
      push(`/documents/${postData.id}`);
    },

    switchFullScreen: (title, content) => {
      this.setState({
        ...this.state,
        title,
        content,
      });
    },
  });

  getData();

  // router
  this.route = async () => {
    const { pathname } = window.location;

    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      if (documentId) {
        const data = await NotionApi.getDocument(documentId);
        sidebarPage.removeBoldId();
        sidebarPage.setBoldId(documentId);
        editorPage.setState({
          ...this.state,
          id: data.id,
          title: data.title,
          content: data.content,
        });

        setSideBarDOM();
      }
    } else if (pathname === '/') {
      sidebarPage.removeBoldId();
      editorPage.setState({
        ...this.state,
        id: '',
        title: '',
        content: '',
      });
    }
  };

  this.route();
  initRouter(() => this.route());
}
