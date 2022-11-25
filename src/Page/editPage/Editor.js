import instanceCheck from "../../utils/instanceCheck.js";

/**편집기를 그리는 컴포넌트 */
export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  instanceCheck(new.target);

  const $editor = document.createElement("div");
  $editor.classList.add("editor");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  };

  this.render = () => {
    $editor.innerHTML = `
    <input type="text" name="title" class="title" value="${this.state.title}"/>
    <textarea name="content" class="content" placeholder="내용을 입력하세요.">${this.state.content}</textarea>
    `;
  };

  this.render();

  $editor.addEventListener("keyup", ({ target }) => {
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
}
