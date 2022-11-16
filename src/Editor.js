export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  };

  this.render = () => {
    $editor.innerHTML = `
      <input type="text" name="title" value="${this.state.title}" class="title"  placeholder="제목을 먼저 입력해주세요"/>
      <textarea name="content" placeholder="내용을 입력해주세요">${this.state.content}</textarea>
    `;
  };

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });

  this.render();
}
