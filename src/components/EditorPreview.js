import { parseMarkdown } from "../utils/parseMarkdown.js";

function EditorPreview({ $target, initialState }) {
  const $preview = document.createElement("section");
  $preview.className = "editor-preview";
  $target.appendChild($preview);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    const { data } = this.state;

    if (!data) return;

    $preview.innerHTML = `
      <h1>preview</h1>
      <div>${parseMarkdown(data)}</div>
      `;
  };

  this.render();
}

export default EditorPreview;
