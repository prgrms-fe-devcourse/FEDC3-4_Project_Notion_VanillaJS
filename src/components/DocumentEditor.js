function DocumentEditor({ $target, initialState }) {
  const $editor = document.createElement("section");
  $editor.className = "document-editor";
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content, documents } = this.state.data;

    if (!title) return;

    $editor.innerHTML = `
      <h1>${title}</h1>
      <textarea class="text-editor" value="${content}"></textarea>
    `;
  };

  this.render();
}

export default DocumentEditor;
