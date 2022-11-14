import { getItem, setItem } from "../storage";

export default function PostEditor({ $target, initialState, onEditing }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  let timer = null;

  this.$editor = $target;
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
    this.$editor.innerHTML = `
      <h1 class="setction_title">
        <input 
          name="title" 
          type="text" 
          maxLength="20"
          value="${this.state.res_content.title || ""}"
          placeHolder = "제목 없음"/>
      </h1>
      <div class="section_content" name="content" contentEditable="true" placeholder="여기에 글자를 입력해주세요">
        ${this.state.res_content.content || ""}
      </div>
    `;

    const contentLength = this.$editor
      .querySelector(".section_content")
      .innerText.replace(/\s/g, "").length;

    if (contentLength < 1) {
      this.$editor.querySelector(".section_content").innerText = "";
    }
  };

  this.$editor.addEventListener("keyup", (e) => {
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
      onEditing(nextState);
    }, 500);
  });
}
