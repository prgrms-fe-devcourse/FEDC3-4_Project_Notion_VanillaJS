import { $, createElement } from '../utils/dom.js';
import { isNew, isString } from '../utils/errorHandler.js';

function EditorTitle({ div, initialState, onChangeTitle }) {
  isNew(new.target);
  const editorTitle = createElement('div');
  editorTitle.className = 'editor-title';
  this.state = initialState;

  div.appendChild(editorTitle);

  this.setState = (nextState) => {
    this.state = nextState;
    const { title } = this.state;
    let el = $('.title');
    this.render();
    editorTitle.querySelector('.title').value = title && title;
  };

  this.render = () => {
    const { title } = this.state;
    editorTitle.innerHTML = `<input type="text" name="title" class="title" placeholder="제목 없음" value="${title}"/>`;
    div.appendChild(editorTitle);
  };

  const onKeyupEditorTitle = () => {
    editorTitle.addEventListener('keyup', (e) => {
      const { name } = e.target;
      const titleValue = e.target.value;

      isString(titleValue);

      const nextState = {
        ...this.state,
        [name]: titleValue,
      };

      onChangeTitle(nextState);
    });
  };
  this.render();
  onKeyupEditorTitle();
}

export default EditorTitle;
