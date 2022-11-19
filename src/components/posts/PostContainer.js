import { updateDocument } from '../../api/notionApi.js';

import { NOTION_CURRENT_STATE } from '../../utils/constants.js';
import createElementHelper from '../../utils/helpers.js';
import { setItem } from '../../utils/storage.js';

import PostEditor from './PostEditor.js';

function PostContainer({ $target, initialState, onRenderApp }) {
  this.state = initialState;

  const $container = createElementHelper('div', '.post-container');
  let timer = null;

  const postEditor = new PostEditor({
    $target: $container,
    initialState: this.state,

    onUpdateText: nextState => {
      const { currentDocument } = nextState;

      onRenderApp(nextState);

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(NOTION_CURRENT_STATE, currentDocument);
        await updateDocument(
          currentDocument.id,
          currentDocument.title,
          currentDocument.content
        );
      }, 1000);
    },
  });

  this.setState = nextState => {
    this.state = nextState;

    postEditor.setState(this.state);
  };

  $target.append($container);
}

export default PostContainer;
