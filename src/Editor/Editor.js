import { createElement } from '../utils/dom.js';
import { isObject } from '../utils/errorHandler.js';
import { request } from '../utils/api.js';
import PostTitle from './PostTitle.js';
import { putTitleMethod } from '../utils/optionsMethod.js';

function Editor({ target, initialState }) {
  const page = createElement('section');
  page.className = 'content';

  const editor = createElement('div');
  editor.className = 'editor';

  page.appendChild(editor);
  target.appendChild(page);

  const postTitle = new PostTitle({
    div: editor,
    initialState: initialState,

    onChangeTitle: async ({ id, title }) => {
      setTimeout(await putTitleMethod(id, title), 2000);
    },
  });

  this.setState = async nextState => {
    console.log(nextState);

    const post = await request(`/documents/${nextState.postId}`);
    isObject(post);

    this.render();
  };

  this.render = () => {
    target.appendChild(page);
  };

  this.render();
}

export default Editor;
