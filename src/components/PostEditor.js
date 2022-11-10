export default function PostEditor({ $target, initialState, onEditing }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  let timer = null;

  this.state = initialState;
  this.onEditing = onEditing;

  this.$div = document.createElement("setcion");
  this.$div.className = "editor";

  $target.appendChild(this.$div);

  this.setState = (nextState, reRender = true) => {
    this.state = nextState;
    if (reRender) {
      this.render();
    }
  };

  this.render = () => {
    this.$div.innerHTML = `
      <h1 class="setction_title">
        <input 
          name="title" 
          type="text" 
          value="${this.state.res_content.title || ""}"
          placeHolder = "제목 없음"/>
      </h1>
      <div class="setcion_content" name="content" contentEditable="true">
        ${this.state.res_content.content || ""}
      </div>
    `;
  };

  this.$div.addEventListener("keyup", (e) => {
    const targetTagName = e.target.tagName;
    let value, name;

    if (targetTagName === "INPUT") {
      value = e.target.value || "제목없음";
      name = e.target.name;
    } else if (targetTagName === "DIV") {
      value = e.target.innerText;
      name = e.target.getAttribute("name");
    }

    const nextState = {
      ...this.state.res_content,
      [name]: value,
    };

    this.setState(
      {
        ...this.state,
        res_content: nextState,
      },
      false
    );

    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      onEditing(this.state.res_content);
    }, 1000);
  });
}
