import { makeElement } from "../../util/templates.js";

export default function Edtior({ $target, initialState }) {
  const $editor = makeElement('div', 'editor');
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $editor.innerHTML = `
      <input type="text" name="title" class="title" />
      <textarea name="content" class="content"></textarea>
    `
  }

  this.render()
}
