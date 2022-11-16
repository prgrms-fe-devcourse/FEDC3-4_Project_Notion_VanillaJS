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
  $target.appendChild($editor);

  // editor 렌더링이 초기 한 번만 발생하도록 하는 변수
  let isInitialize = false;

  // 자동저장된 값을 불러와 사용하기 위해 필요한 초기값
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
        <input type="text" name="title" style="width:500px;" value="${this.state.title}"/>
        <textarea name="content" style="width:500px;height:500px;">${this.state.content}</textarea>
    `;
      isInitialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", e => {
    const { target } = e;
    const name = target.getAttribute("name");

    // state에 존재하는 name만 사용하기 위한 방어코드
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
