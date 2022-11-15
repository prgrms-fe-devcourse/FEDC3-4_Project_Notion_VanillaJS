import { request } from './api/request.js';
import EditorContainer from './component/Editor/EditorContainer.js';
import ModalContainer from './component/Modal/ModalContainer.js';
import SideBarContainer from './component/SideBar/SideBarContainer.js';
// import { $ } from './lib/utils.js';

export default function App({ $target }) {
  this.state = {
    list: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;

    sidebarContainer.setState(this.state);
    editorContainer.setState({
      title: this.state.title,
      text: this.state.text,
    });
  };

  const sidebarContainer = new SideBarContainer({
    $target,
    initialState: {},
  });

  const editorContainer = new EditorContainer({
    $target,
    initialState: {},
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
    postDocument: async (title, id) => {
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title,
          parent: id,
        }),
      });

      getData();
    },

    switchFullScreen: (title, text) => {
      this.setState({
        ...this.state,
        title,
        text,
      });

      console.log(this.state);
    },
  });

  const getData = async () => {
    const data = await request('/documents', {
      method: 'GET',
    });

    const nextState = [...data];
    this.setState({
      ...this.state,
      list: nextState,
    });
    console.log($target.childNodes);
  };
  getData();
}
