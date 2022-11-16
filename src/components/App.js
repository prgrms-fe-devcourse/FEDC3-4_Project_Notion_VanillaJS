import request from '../api/index.js';
import { getItem, setItem } from '../utils/storage.js';
import ModalContainer from './modal/ModalContainer.js';

import PostPage from './posts/PostPage.js';
import SidebarPage from './sidebar/SidebarPage.js';

const NOTION_CURRENT_STATE = 'NOTION_CURRENT_STATE';

class App {
  constructor($target) {
    this.$target = $target;

    this.state = {
      allList: [],
      currentList: getItem(NOTION_CURRENT_STATE, {
        id: '',
        title: '',
        content: '',
      }),
    };

    let timer = null;

    this.sidebarPage = new SidebarPage({
      $target: this.$target,
      initialState: this.state.allList,

      onClickDoucmentList: data => {
        const { id, title, content } = data;
        const nextcurrentListState = { id, title, content };

        this.setState({
          allList: [...this.state.allList],
          currentList: nextcurrentListState,
        });

        setItem(NOTION_CURRENT_STATE, nextcurrentListState);
      },

      onAddRootDocumentList: () => {
        new ModalContainer({ $target: this.$target });
      },
    });

    this.postPage = new PostPage({
      $target: this.$target,
      initialState: this.state.currentList,

      onInputTitle: async postState => {
        const currentListIndex = this.state.allList.findIndex(
          documentList => documentList.id === postState.id
        );
        const nextState = {
          currentList: {
            id: postState.id,
            title: postState.title,
            content: postState.content,
          },
          allList: this.state.allList,
        };
        nextState.allList[currentListIndex] = nextState.currentList;

        this.setState(nextState);

        if (timer !== null) {
          clearTimeout(timer);
        }

        timer = setTimeout(async () => {
          setItem(NOTION_CURRENT_STATE, postState);

          await request(`documents/${postState.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: postState.title,
              content: postState.content,
            }),
          });
        }, 500);
      },
    });

    this.readAllDoucmentList();
  }

  setState(nextState) {
    this.state = nextState;

    this.postPage.setState(this.state.currentList);
    this.sidebarPage.setState(this.state.allList);
  }

  async readAllDoucmentList() {
    const data = await request('documents');

    this.setState({
      ...this.state,
      allList: data,
    });
  }
}

export default App;
