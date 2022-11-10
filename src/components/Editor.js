import { isNew } from '../utils/helper.js';
import { UNTITLED } from '../utils/contants.js';

export default function Editor({
  $target,
  initialState = { title: '', content: '' },
  onEditing,
}) {
  isNew(new.target);

  const $editor = document.createElement('div');

  $editor.innerHTML = `
      <input type="text" name="title" style="width: 600px;" placeholder="${UNTITLED}"/>
      <textarea name="content" style="width: 600px; height: 400px;" placeholder="Type '/' for commands"</textarea>
  `;

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector('[name=title]').value = title;
    $editor.querySelector('[name=content]').value = content;
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
    const { target } = e;

    const name = target.getAttribute('name');

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
