import { parseMarkdown } from "../utils/parseMarkdown.js";

function EditorPreview({ $target, initialState }) {
  const $preview = document.createElement("section");
  $preview.className = "editor-preview";
  $target.appendChild($preview);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state.data) return;

    const { content } = this.state.data;

    $preview.innerHTML = `
      <h1 class="preview-title">미리보기</h1>
      <div class="preview-content">${
        content ? parseMarkdown(content) : "내용 없음"
      }</div>
      `;
  };

  this.render();
}

export default EditorPreview;
