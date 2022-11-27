export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  $target.appendChild($editor);
  this.state = initialState;

  const { title, content } = this.state;

  $editor.innerHTML = `
      <input type="text" name="title" class="title"/>
      <div class="toolbar">
        <img src="/src/img/bold.png" data-command="bold"/>
        <img src="/src/img/italic.png" data-command="italic"/>
        <img src="/src/img/left-align.png" data-command="justifyLeft"/>
        <img src="/src/img/center-align.png" data-command="justifyCenter"/>
        <img src="/src/img/right-align.png" data-command="justifyRight"/>
        <img src="/src/img/underline-text.png" data-command="underLine"/>
        <img src="/src/img/strikethrough.png" data-command="strikeThrough"/>
      </div>
      <div class="content" contenteditable="true" name="content"></div>
  `;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title;
    const content = $editor.querySelector("[name=content]");
    if (this.state.content) {
      content.innerHTML = this.state.content.split("\n").join("<br/>");
    } else {
      content.innerHTML = "";
    }
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
      const command = e.target.getAttribute("data-command");
      document.execCommand(command);
    });
  });

  this.render();
}
