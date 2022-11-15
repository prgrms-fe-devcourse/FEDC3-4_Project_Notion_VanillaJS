import { $ } from '../../lib/utils.js';

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');
  $editor.className = 'editor-contents';

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $('[name=title]', $editor).value = this.state.title;
    $('[name=content]', $editor).value = this.state.content;
  };

  const editorContent = (title = '', content = '') => {
    return `
         <input
            class="editor-title"
            type="text"
            name="title"
            id="title"
            value="${title}"
            placeholder="제목 없음"
          />
          <textarea
            class="editor-content"
            name="content"
            id="content"
            placeholder="내용을 입력하세요..😁"
          >${content}</textarea>
    `;
  };

  this.render = () => {
    $editor.innerHTML = editorContent(this.state.title, this.state.content);
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
    const { target } = e;
    const nameValue = target.getAttribute('name');

    if (this.state[nameValue] !== undefined) {
      const nextState = {
        ...this.state,
        [nameValue]: target.value,
      };
      console.log(nextState);
      onEditing(nextState);
    }
  });
}
