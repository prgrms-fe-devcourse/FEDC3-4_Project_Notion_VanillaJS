import { createElement } from '../utils/dom.js';
import { isNew, isString } from '../utils/errorHandler.js';

function EditorContent({ div, initialState, onChangeContent }) {
  isNew(new.target);
  const editorContent = createElement('div');
  editorContent.className = 'editor-content';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const { content } = this.state;

    this.render();
    editorContent.querySelector('.content').value = content && content;
  };

  this.render = () => {
    const { content } = this.state;
    editorContent.innerHTML = `<textarea name="content" placeholder="내용 없음" 
                    class="
                    content
                    ">${content}</textarea>`;

    div.appendChild(editorContent);
  };

  const onKeyUpContent = () => {
    editorContent.addEventListener('keyup', (e) => {
      const { name } = e.target;
      const contentValue = e.target.value;
      isString(contentValue);
      const nextState = {
        ...this.state,
        [name]: contentValue,
      };

      onChangeContent(nextState);
    });
  };

  this.render();
  onKeyUpContent();
}

export default EditorContent;
