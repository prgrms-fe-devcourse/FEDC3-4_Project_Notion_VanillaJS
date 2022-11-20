import { $ } from '../../lib/utils.js';
import InitialEditor from './InitialEditor.js';

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');
  $editor.className = 'editor-contents';

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    if (this.state.id) {
      $('[name=title]', $editor).value = this.state.title;
      $('[name=content]', $editor).value = this.state.content;
    }
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
    $target.appendChild($editor);
  };

  if (this.state.id) this.render();

  this.removeEditor = () => {
    if ([...$target.childNodes].includes($editor)) {
      $target.removeChild($editor);
    }
  };

  $editor.addEventListener('keyup', (e) => {
    const { target } = e;
    const nameValue = target.getAttribute('name');

    if (this.state[nameValue] !== undefined) {
      const nextState = {
        ...this.state,
        [nameValue]: target.value,
      };
      if (nameValue === 'title') {
        // 방법이 두가지, state를 넘겨주어서 처리? 아니면 바로 여기서 처리
        const $li = document.getElementById(`${this.state.id}`);
        const $span = $('span', $li);
        $span.textContent = target.value;
      }

      onEditing(nextState);
    }
  });
}
