import { readRootDocuments } from '../api/notionApi.js';

import { getItem } from '../utils/storage.js';
import { NOTION_CURRENT_STATE } from '../utils/constants.js';

import PostContainer from './posts/PostContainer.js';
import SidebarContainer from './sidebar/SidebarContainer.js';

function App({ $target }) {
  this.state = {
    allList: [],
    currentDocument: getItem(NOTION_CURRENT_STATE, {
      id: '',
      title: '',
      content: '',
    }),
  };

  const sidebarContainer = new SidebarContainer({
    $target,
    initialState: this.state,
    onRenderApp: nextState => {
      this.setState(nextState);
    },
  });

  const postContainer = new PostContainer({
    $target,
    initialState: this.state,
    onRenderApp: nextState => {
      this.setState(nextState);
    },
  });

  this.setState = nextState => {
    // if (Array.isArray(nextState)) {
    //   this.state.allList = nextState;
    // } else {
    //   this.state.currentDocument = nextState;
    // }

    this.state = nextState;

    sidebarContainer.setState(this.state);
    postContainer.setState(this.state);
  };

  this.render = async () => {
    const data = await readRootDocuments();
    const nextState = {
      allList: data,
      currentDocument: this.state.currentDocument,
    };

    this.setState(nextState);
  };
}

export default App;
