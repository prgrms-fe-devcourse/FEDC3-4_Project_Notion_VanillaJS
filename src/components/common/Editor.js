export default function Editor({ $editorPageTarget, initialState, onEditing }) {
  const $editor = document.createElement("div");

  $editor.innerHTML = `
    <input type="text" name="title" style="width: 600px; display:none;"/>
    <textarea name="content" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px; display:none;">안녕</textarea>
  `;

  $editorPageTarget.appendChild($editor);

  this.editorState = initialState;

  this.editorSetState = (nextState) => {
    this.editorState = nextState;
    this.render();
  };

  const indexRender = (status) => {
    $editorPageTarget.querySelector("[name=title]").style.display = status;
    $editorPageTarget.querySelector("[name=content]").style.display = status;
  };

  this.render = () => {
    if (this.editorState) {
      const { title, content } = this.editorState;

      // by 민형, index 페이지 일 경우_221113
      if (title === "not render") {
        indexRender("none");
      } else {
        indexRender("block");

        $editorPageTarget.querySelector("[name=title]").value = title;
        $editorPageTarget.querySelector("[name=content]").value = content;
      }
    }
    // by 민형, 서버에서 데이터를 먼저 불러오므로 먼저 render_221112
    // console.log("ediotr render");
  };

  this.render();

  $editorPageTarget
    .querySelector("[name=title]")
    .addEventListener("keyup", (e) => {
      const newTitle = e.target.value;
      if (newTitle) {
        const nextState = { ...this.editorState, title: newTitle };
        this.editorSetState(nextState);
        onEditing(nextState);
      }
    });

  $editorPageTarget
    .querySelector("[name=content]")
    .addEventListener("keyup", (e) => {
      const newContent = e.target.value;
      if (newContent) {
        const nextState = { ...this.editorState, content: newContent };
        this.editorSetState(nextState);
        onEditing(nextState);
      }
    });
}
