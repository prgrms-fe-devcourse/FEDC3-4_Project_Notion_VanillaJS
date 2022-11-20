import { request } from './api/request.js';
import EditorContainer from './component/Editor/EditorContainer.js';
import ModalContainer from './component/Modal/ModalContainer.js';
import SideBarContainer from './component/SideBar/SideBarContainer.js';
import { SIDELIST_KEY } from './lib/constants.js';
import { initRouter, push } from './lib/router.js';
import { setItem } from './lib/storage.js';
import { $ } from './lib/utils.js';

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
      sidebarContainer.setState(this.state.list);
      isInitialize = true;
    }
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
    setEditor: (id, title = '', content = '') => {
      editorContainer.setState({
        ...this.state,
        id,
        title,
        content,
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
    // 타이틀이 없거나 제목 없음일 경우 리스트에서 삭제.
    clearUntitledDocument: () => {
      const $li = document.getElementById('new');
      const parent = $li.parentElement;
      parent.removeChild($li);
      const $list = parent.closest('.list');
      const $toggler = $('.toggler', parent.parentElement);

      if ($('li', parent) === null) {
        $toggler.classList.toggle('active');
      }

      setItem(SIDELIST_KEY, $list.innerHTML);
    },

    // 타이틀이 있으면 해당 RootDocument 추가
    postDocument: async (title, content, id) => {
      // 타이틀과 Id로 데이터 추가
      const postData = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title,
          parent: id,
        }),
      });
      // 추가한 데이터로 화면 리렌더링
      await getData();

      // 해당 데이터 id의 내용 수정해놓기
      await request(`/documents/${postData.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const $li = document.getElementById('new');
      $li.setAttribute('id', postData.id);
      const $span = $(`span[data-id='new']`);
      $span.setAttribute('data-id', postData.id);
      const $list = $span.closest('.list');

      setItem(SIDELIST_KEY, $list.innerHTML);

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
        const data = await request(`/documents/${documentId}`);
        sidebarContainer.removeBoldId();
        sidebarContainer.setBoldId(documentId);
        editorContainer.setState({
          ...this.state,
          id: data.id,
          title: data.title,
          content: data.content,
        });

        setItem(SIDELIST_KEY, $('.list', $target).innerHTML);
      }
    } else if (pathname === '/') {
      sidebarContainer.removeBoldId();
      editorContainer.setState({
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
