import { request } from './api/request.js';
import EditorContainer from './component/Editor/EditorContainer.js';
import ModalContainer from './component/Modal/ModalContainer.js';
import SideBarContainer from './component/SideBar/SideBarContainer.js';
import { initRouter } from './lib/router.js';
// import { $ } from './lib/utils.js';

export default function App({ $target }) {
  this.state = {
    list: [],
    id: '',
    title: '',
    content: '',
  };

  this.setState = (nextState) => {
    this.state = nextState;

    sidebarContainer.setState(this.state);
    editorContainer.setState({
      id: this.state.id,
      title: this.state.title,
      content: this.state.content,
    });
  };

  const getData = async () => {
    const data = await request('/documents', {
      method: 'GET',
    });
    const nextState = [...data];
    this.setState({
      ...this.state,
      list: nextState,
    });
  };

  // Container
  const sidebarContainer = new SideBarContainer({
    $target,
    initialState: {},
    getData,
    setEditor: (id, title, content) => {
      this.setState({
        ...this.state,
        id,
        title,
        content: content ? content : '',
      });
    },
  });

  const editorContainer = new EditorContainer({
    $target,
    initialState: {
      id: '',
      title: '',
      content: '',
    },
  });

  new ModalContainer({
    $target,
    initialState: {},

    // modal 띄워질 시 list 스크롤 고정

    // 타이틀이 없거나 제목 없음일 경우 리스트에서 삭제.
    clearUntitledDocument: () => {
      const nextState = {
        ...this.state,
        list: [...this.state.list],
      };
      // 맨 마지막에 추가헀던 요소 삭제
      if (nextState.list[nextState.list.length - 1].id === 'new') {
        nextState.list.pop();
      }
      this.setState(nextState);
    },

    // 타이틀이 있으면 해당 RootDocument 추가
    postDocument: async (title, content, id) => {
      const postData = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title,
          parent: id,
        }),
      });

      await getData();

      await request(`/documents/${postData.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          content,
        }),
      });
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
        const data = await request(`/documents/${documentId}`, {
          method: 'GET',
        });
        this.setState({
          ...this.state,
          id: data.id,
          title: data.title,
          content: data.content,
        });
      }
    }
  };

  this.route();
  initRouter(() => this.route());
}
