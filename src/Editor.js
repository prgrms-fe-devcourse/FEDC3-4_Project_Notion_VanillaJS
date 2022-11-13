import { CheckNew } from "./Error.js";

export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  CheckNew(new.target);

  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  let isInit = false;

  this.render = () => {
    // 얘도 밖으로 뺴도 될듯..?
    if (!isInit) {
      $editor.innerHTML = `
      <input type="text" name="title" style="width:600px;display:block" value="${this.state.title}" />
      <textarea name="content" style="width:600px; height:600px">${this.state.content}</textarea>
    `;

      isInit = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;

    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
