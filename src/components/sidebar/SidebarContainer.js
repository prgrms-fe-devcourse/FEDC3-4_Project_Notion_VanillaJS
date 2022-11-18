import { createDocument } from '../../api/notionApi.js';

import { NOTION_CURRENT_STATE } from '../../utils/constants.js';
import createElementHelper from '../../utils/helpers.js';
import { setItem } from '../../utils/storage.js';

import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

class SidebarPage {
  constructor(props) {
    this.props = props;
  }

  mounted() {
    const { $target, allList, onUpdateState } = this.props;
    const $navigation = createElementHelper('nav', '.sidebar-container');
    $navigation.innerHTML = '';

    new SidebarHeader({ $target: $navigation }).mounted();
    new SidebarBody({
      $target: $navigation,
      allList,
      onClickDoucment: async currentDocumentId => {
        const newDocumentData = await createDocument(currentDocumentId);
        const nextState = {
          id: newDocumentData.id,
          title: newDocumentData.title,
          content: newDocumentData.content,
        };

        setItem(NOTION_CURRENT_STATE, nextState);

        onUpdateState(nextState, 'post');
      },
    }).mounted();
    new SidebarFooter({ $target: $navigation }).mounted();

    $target.append($navigation);
  }
}

export default SidebarPage;
