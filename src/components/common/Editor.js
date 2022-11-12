export default function Editor({ $editorPageTarget, initialState }) {
  const $editor = document.createElement("div");

  $editorPageTarget.appendChild($editor);

  this.editorState = initialState;

  this.editorSetState = (nextState) => {
    this.editorState = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.editorState;
    if (title || content) {
      $editor.innerHTML = `
        <input type="text" name="title" style="width: 600px;" value="${title}"/>
        <div name="content" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px;">${content}</div>
    `;
    }
  };

  this.render();
}
