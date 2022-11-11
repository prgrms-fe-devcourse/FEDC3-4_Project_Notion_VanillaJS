import { getItem, setItem } from "../storage";

export default function PostEditor({ $target, initialState, onEditing }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  let timer = null;

  this.$div = $target;
  this.state = initialState;
  this.onEditing = onEditing;

  this.setState = (nextState) => {
    const { isNeedRender } = getItem("currentContentId", null);

    this.state = nextState;
    if (isNeedRender) {
      this.render();
    }
  };

  this.render = () => {
    this.$div.innerHTML = `
      <h1 class="setction_title">
        <input 
          name="title" 
          type="text" 
          maxLength="20"
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
      value = e.target.value;
      name = e.target.name;
    } else if (targetTagName === "DIV") {
      value = e.target.innerText;
      name = e.target.getAttribute("name");
    }

    const { id } = getItem("currentContentId", null);

    const nextState = {
      ...this.state.res_content,
      [name]: value,
    };

    if (this.state.res_content.id === id) {
      setItem(
        "inProgressContent",
        JSON.stringify({
          ...nextState,
        })
      );
      setItem(
        "currentContentId",
        JSON.stringify({
          id,
          isNeedRender: false,
        })
      );
    }

    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      onEditing(this.state.res_content);
    }, 500);
  });
}
