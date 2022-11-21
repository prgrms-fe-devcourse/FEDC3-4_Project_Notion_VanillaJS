import { setSideBarDOM } from '../../lib/storage.js';
import { editorContent } from '../../lib/templates.js';
import { $ } from '../../lib/dom.js';

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
        const $li = document.getElementById(`${this.state.id}`);
        const $span = $('span', $li);
        $span.textContent = target.value;
      }

      setSideBarDOM();
      onEditing(nextState);
    }
  });
}
