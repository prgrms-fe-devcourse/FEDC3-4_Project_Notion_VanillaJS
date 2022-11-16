export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  $target.appendChild($editor);

  $editor.innerHTML = `
      <input type="text" name="title" class="title"  placeholder="제목을 먼저 입력해주세요"/>
      <div class="toolbar">
        <img src="/src/img/bold.png" data-commend="bold"/>
        <img src="/src/img/italic.png" data-commend="italic"/>
        <img src="/src/img/left-align.png" data-commend="justifyLeft"/>
        <img src="/src/img/center-align.png" data-commend="justifyCenter"/>
        <img src="/src/img/right-align.png" data-commend="justifyRight"/>
        <img src="/src/img/underline-text.png" data-commend="underLine"/>
        <img src="/src/img/strikethrough.png" data-commend="strikeThrough"/>
      </div>
      <div class="content" contenteditable="true" name="content"></div>
  `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title;
    const content = $editor.querySelector("[name=content]");
    if (content.innerHTML.length !== 0)
      content.innerHTML = this.state.content.split("\n").join("<br/>");
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = { ...this.state, title: e.target.value };

    this.setState(nextState);
    onEditing(this.state);
  });

  let timer = null;
  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      const nextState = {
        ...this.state,
        content: e.target.innerText,
      };
      if (this.state.content === nextState.content) return;
      this.setState(nextState);
      onEditing(this.state);
    }, 1000);
  });

  $editor.querySelectorAll(".toolbar img").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      const command = e.target.getAttribute("data-commend");
      document.execCommand(command);
    });
  });

  this.render();
}
