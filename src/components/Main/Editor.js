import { makeElement } from "../../util/templates.js";

export default function Edtior({ 
  $target,
  initialState = {
    title: '',
    content: ''
  },
  onEdit 
}) {
  const $editor = makeElement("div", "editor");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init = () => {
    $editor.innerHTML = `
      <input type="text" name="title" class="title" value="" />
      <textarea name="content" class="content"></textarea>
    `;
  };

  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  };

  this.init();

  $editor.addEventListener('keyup', e => {
    const { target } = e;
    const name = target.getAttribute('name');

    const nextState = {
      ...this.state,
      [name]: target.value
    }
    
    onEdit(nextState);
  })
}
