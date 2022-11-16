export default function ContentEditor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $contentEditor = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  $contentEditor.innerHTML = `
    <input
      type="text"
      class="editor-title"
      name="title"
    />
    <textarea
      class="editor-content"
      name="content"
    >
      ${this.state.content}
    </textarea>
  `;

  $target.appendChild($contentEditor);

  this.render = () => {
    $contentEditor.querySelector("[name=title]").value = this.state.title;
    $contentEditor.querySelector("[name=content]").value = this.state.content;
  };

  this.render();

  $contentEditor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    const nextState = {
      ...this.state,
      [name]: target.value,
    };

    this.setState(nextState);
    onEditing(this.state);
  });
}
