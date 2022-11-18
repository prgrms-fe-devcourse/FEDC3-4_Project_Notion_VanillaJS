import { updateDocument } from '../../api/notionApi.js';

import { NOTION_CURRENT_STATE } from '../../utils/constants.js';
import createElementHelper from '../../utils/helpers.js';
import { setItem } from '../../utils/storage.js';

import PostEditor from './PostEditor.js';

class PostContainer {
  constructor(props) {
    this.props = props;
  }

  mounted() {
    const $container = createElementHelper('div', '.post-container');
    const { id, title, content } = this.props.currentDocument;
    const { $target, onUpdateState } = this.props;
    let timer = null;

    new PostEditor({
      $target: $container,
      currentDocument: { id, title, content },

      onUpdateText: (postState, type) => {
        if (timer !== null) {
          clearTimeout(timer);
        }

        if (type === 'title') {
          onUpdateState(postState, 'document');
        }

        timer = setTimeout(async () => {
          setItem(NOTION_CURRENT_STATE, postState);
          await updateDocument(postState.id, postState.title, postState.content);
        }, 1000);
      },
    }).mounted();

    $target.append($container);
  }
}

export default PostContainer;
