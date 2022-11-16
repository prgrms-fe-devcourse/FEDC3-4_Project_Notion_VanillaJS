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
    const newContent =
      this.state.res_content.content?.replace("\n", "").replaceAll("\n", "<br>") || "";

    //prettier-ignore
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
        ${newContent} 
      </div>
    `;

    if (!this.state.res_content.content) {
      this.$editor.querySelector(".section_content").innerText = "";
    }
  };

  this.$editor.addEventListener("keyup", (e) => {
    const { target } = e;

    if (target) {
      const targetTagName = target.tagName;
      let value, name;

      if (targetTagName === "INPUT") {
        value = target.value;
        name = target.name;
      } else if (targetTagName === "DIV") {
        value = target.innerHTML;
        name = target.getAttribute("name");
      }

      const { id } = getItem("currentContentId", null);

      const nextState = {
        ...this.state.res_content,
        [name]: value,
      };

      if (this.state.res_content.id === Number(id)) {
        //리렌더링 되지 않도록 isNeedRender를 false로 바꾸고, 데이터 손실 방지를 위해 isNeedRender에 임시 저장
        setItem("inProgressContent", nextState);
        setItem("currentContentId", { id, isNeedRender: false });
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        onEditing(nextState);
      }, 500);
    }
  });
}
