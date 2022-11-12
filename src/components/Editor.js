// editor는 title과 content로 이루어져있다.
// title과 content가 업데이트 될 때마다 keyup이벤트를 이용해서 onEditing을 호출한다.

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  $target.appendChild($editor);

  this.render = () => {
    $editor.innerHTML = `
      <input type="text" name="title" style="width:600px" value="${this.state.title}" />
      <textarea name="content" style="width:600px;height:400px;border:1px solid black; padding:8px;">${this.state.content}</textarea>
      `;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEditing(nextState);
    }
  });
}
