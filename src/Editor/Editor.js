import { createElement } from '../utils/dom.js';
import { isNew, isObject } from '../utils/errorHandler.js';
import { request } from '../utils/api.js';
import { putContentMethod, putTitleMethod } from '../utils/optionsMethod.js';
import EditorTitle from './EditorTitle.js';
import EditorContent from './EditorContent.js';
import { documentsUrl } from '../utils/util.js';
import EditorSubContetn from './EditorSubContetn.js';

function Editor({ target, initialState }) {
  isNew(new.target);
  const page = createElement('section');
  page.className = 'content';

  const editor = createElement('div');
  editor.className = 'editor';

  this.state = initialState;
  const postTitle = new EditorTitle({
    div: editor,
    initialState: initialState,

    onChangeTitle: async ({ id, title }) => {
      setTimeout(await putTitleMethod(id, title), 2000);
    },
  });

  const postContent = new EditorContent({
    div: editor,
    initialState: initialState,

    onChangeContent: async ({ id, content }) => {
      setTimeout(await putContentMethod(id, content), 2000);
    },
  });

  const postSub = new EditorSubContetn({
    div: editor,
    initialState: initialState,
  });

  this.setState = async (nextState) => {
    const post = await request(`${documentsUrl}/${nextState.postId}`);
    isObject(post);
    postTitle.setState(post);
    postContent.setState(post);
    postSub.setState(post);
    this.render();
  };

  this.render = () => {
    // editor2.innerHTML = createSubDoucuments();
    page.appendChild(editor);
    target.appendChild(page);
  };

  this.render();
}

export default Editor;
