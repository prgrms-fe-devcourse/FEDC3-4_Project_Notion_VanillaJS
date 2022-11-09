export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");

  $editor.innerHTML = `
    <input type="text" name="title" stlye="width: 600px" />
    <div name="content" contenteditable="true" style="width: 600px; height:400px; border: 1px solid black; padding: 8px;"></div>
  `;

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const nextState = { ...this.state, title: e.target.value };

    this.setState(nextState);
    onEditing(this.state);
  });

  $editor.addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    this.setState(nextState);
  });
}
