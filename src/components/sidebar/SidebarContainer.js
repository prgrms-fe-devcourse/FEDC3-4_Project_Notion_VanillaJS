import { readDocument } from '../../api/notionApi.js';

import { NOTION_CURRENT_STATE } from '../../utils/constants.js';
import createElementHelper from '../../utils/helpers.js';
import { setItem } from '../../utils/storage.js';

import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

function SidebarPage({ $target, initialState, onRenderApp }) {
  this.state = initialState;

  const $navigation = createElementHelper('nav', '.sidebar-container');
  const sidebarHeader = new SidebarHeader({ $target: $navigation });
  const sidebarBody = new SidebarBody({
    $target: $navigation,
    initialState: this.state,

    onClickDoucment: async currentDocumentId => {
      const newDocumentData = await readDocument(currentDocumentId);
      const nextState = {
        allList: this.state.allList,
        currentDocument: {
          id: newDocumentData.id,
          title: newDocumentData.title,
          content: newDocumentData.content,
        },
      };

      onRenderApp(nextState);
      setItem(NOTION_CURRENT_STATE, nextState.currentDocument);
    },
  });
  const sidebarFooter = new SidebarFooter({ $target: $navigation });

  this.setState = nextState => {
    this.state = nextState;

    sidebarBody.setState(this.state);
  };

  sidebarHeader.render();
  sidebarFooter.render();
  $target.append($navigation);
}

export default SidebarPage;
