function DocumentEditor({ $target }) {
  const $editor = document.createElement("section");
  $editor.className = "document-editor";
  $target.appendChild($editor);

  this.render = () => {
    $editor.innerHTML = `<h1>에디터</h1>`;
  };

  this.render();
}

export default DocumentEditor;
