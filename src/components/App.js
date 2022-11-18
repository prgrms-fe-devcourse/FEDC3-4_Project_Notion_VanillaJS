import { readRootDocuments } from '../api/notionApi.js';

import { getItem } from '../utils/storage.js';
import { NOTION_CURRENT_STATE } from '../utils/constants.js';
import { comparePostEditor, compareSidebarTitle } from '../utils/compare.js';

import PostContainer from './posts/PostContainer.js';
import SidebarContainer from './sidebar/SidebarContainer.js';

class App {
  constructor($target) {
    this.$target = $target;

    this.state = {
      allList: [],
      currentDocument: getItem(NOTION_CURRENT_STATE, {
        id: '',
        title: '',
        content: '',
      }),
    };
  }

  setState(nextState, renderalbe) {
    if (Array.isArray(nextState)) {
      this.state = {
        ...this.state,
        allList: nextState,
      };
    } else {
      this.state = {
        ...this.state,
        currentDocument: nextState,
      };
    }

    this.updateDOM(nextState, renderalbe);
  }

  updateDOM(currentState, renderalbe) {
    switch (renderalbe) {
      case 'post':
        comparePostEditor(currentState);
        break;
      case 'document':
        compareSidebarTitle(currentState);
        break;
      default:
        break;
    }
  }

  async mounted() {
    const data = await readRootDocuments();

    this.setState(data, 'all');

    new PostContainer({
      $target: this.$target,
      currentDocument: this.state.currentDocument,
      onUpdateState: (nextState, renderalbe) => {
        this.setState(nextState, renderalbe);
      },
    }).mounted();
    new SidebarContainer({
      $target: this.$target,
      allList: this.state.allList,
      onUpdateState: (nextState, renderalbe) => {
        this.setState(nextState, renderalbe);
      },
    }).mounted();
  }
}

export default App;
