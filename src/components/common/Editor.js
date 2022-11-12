export default function Editor({ $editorPageTarget, initialState }) {
  const $editor = document.createElement("div");

  $editorPageTarget.appendChild($editor);

  this.editorState = initialState;

  this.editorSetState = (nextState) => {
    this.editorState = nextState;
    this.render();
  };

  this.render = () => {
    if (this.editorState) {
      const { title, content } = this.editorState;

      $editor.innerHTML = `
          <input type="text" name="title" style="width: 600px;" value="${title}"/>
          <div name="content" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px;">${content}</div>
      `;
      // by 민형, 서버에서 데이터를 먼저 불러오므로 먼저 render_221112
      console.log("ediotr render");
    } else {
      $editor.innerHTML = ``;
    }
  };

  this.render();
}
