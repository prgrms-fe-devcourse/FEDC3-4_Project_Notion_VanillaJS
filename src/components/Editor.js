export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  if (!(this instanceof Editor)) {
    throw new Error("new로 생성하지 않았습니다.");
  }
  const $editor = document.createElement("div");

  $editor.setAttribute("class", "editor");
  $target.appendChild($editor);

  let isInitialize = false;

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;

    this.render();
  };

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
        <input 
        id="input-title" 
        type="text" 
        name="title" 
        style="width:500px;" 
        value="${this.state.title}"
        placeholder="제목을 입력해주세요"
        />
        <textarea 
        id="input-content" 
        name="content" 
        style="width:500px;height:500px;"
        placeholder="내용을 입력해주세요">
        ${this.state.content}
        </textarea>
    `;
      isInitialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", e => {
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
}
