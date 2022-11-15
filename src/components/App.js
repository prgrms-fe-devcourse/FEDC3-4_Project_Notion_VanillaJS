import request from '../api/index.js';

import PostPage from './posts/PostPage.js';
import SidebarPage from './sidebar/SidebarPage.js';

class App {
  constructor($target) {
    this.$target = $target;

    this.state = {
      allList: [],
      currentList: {
        id: '',
        title: '',
        content: '',
        documents: [],
      },
    };

    this.initialization();

    this.postPage = new PostPage(this.$target, {
      documentListData: this.state.currentList,
    });
    this.sidebarPage = new SidebarPage(this.$target, {
      documentsListData: this.state.allList,

      onParentSetState: data => {
        const { id, title, content, documents } = data;

        this.setState({
          allList: [...this.state.allList],
          currentList: { id, title, content, documents },
        });
      },
    });
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

  async initialization() {
    await this.readAllDoucmentList();
  }
}

export default App;
