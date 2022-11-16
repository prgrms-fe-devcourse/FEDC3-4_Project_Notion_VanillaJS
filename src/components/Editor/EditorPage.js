export default function EditorPage({ $target, initialState, onEditing }) {
  const $editorPage = document.createElement("div");
  $target.appendChild($editorPage);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editorPage.querySelector("[name=title]").value = this.state.title;
    $editorPage.querySelector("[name=content]").value = this.state.content;
  };

  this.render = () => {
    $editorPage.innerHTML = `
      <input type="text" name="title" maxlength="30" placeholder="제목을 입력해주세요." ></input>
      <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
    `;
  };
  this.render();
  $editorPage.addEventListener("keyup", (e) => {
    const { target } = e;
    const { name } = target;

    const editedDoc = {
      ...this.state,
      [name]: target.value,
    };
    this.setState(editedDoc);
    onEditing(editedDoc);
  });
}
