import { makeElement } from "../../util/templates.js";

export default function Edtior({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEdit,
}) {
  const $editor = makeElement("div", "editor");

  $editor.innerHTML = `
  <input type="text" name="title" class="title" id="cheese" />
  <textarea name="content" class="content"></textarea>
`;

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init = () => {
    $editor.innerHTML = `
      <input type="text" name="title" class="title" disabled/>
      <textarea name="content" class="content" disabled></textarea>
    `;
  };

  this.render = () => {
    const { title, content } = this.state;
    const $title = $editor.querySelector("[name=title]");
    const $content = $editor.querySelector("[name=content]");

    $title.disabled = $content.disabled = false;

    if (!title) {
      $title.placeholder = "Give it a title... ✍️";
    }

    $title.value = title;
    $content.value = content;

    $title.focus();
  };

  $editor.addEventListener("click", (e) => {
    const { disabled } = e.target;

    if (disabled) {
      alert("Select note from list!");
    }
  });

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    const nextState = {
      ...this.state,
      [name]: target.value,
    };

    onEdit(nextState);
  });
}
