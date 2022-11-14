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

  this.setStyle = (style) => {
    document.execCommand(style);
    document.querySelector(".section_content").focus({ preventScroll: true });
  };

  this.render = () => {
    const newContent = this.state.res_content.content?.replaceAll("\n", "<br/>") || "";

    this.$editor.innerHTML = `
      <h1 class="setction_title">
        <input 
          name="title" 
          type="text" 
          maxLength="20"
          value="${this.state.res_content.title || ""}"
          placeHolder = "제목 없음"/>
      </h1>
      <div class="editor-menu">
        <button id="bold">
          <b>B</b>
        </button>
        <button id="italic">
          <i>i</i>
        </button>
        <button id="underline">
          <u>u</u>
        </button>    
        <button id="strikeThrough">
          <strike>s</strike>
        </button>    
      </div>
      <div class="section_content" name="content" contentEditable="true" placeholder="여기에 글자를 입력해주세요">
        ${newContent.split("<br/>")[1]}
      </div>
    `;

    if (!this.state.res_content.content) {
      this.$editor.querySelector(".section_content").innerText = "";
    }
  };

  this.$editor.addEventListener("click", (e) => {
    e.stopImmediatePropagation();

    if (e.target) {
      const btn = e.target.closest("button");
      const section_content = e.target.closest(".section_content");
      if (btn) {
        const { id, className } = btn;

        if (className === "on") {
          btn.className = "";
        } else {
          btn.className = "on";
        }
        this.setStyle(id);
      } else if (section_content) {
        let tag = e.target;
        const tagList = [];

        while (tag.tagName !== "DIV") {
          tagList.push(tag.tagName);
          tag = tag.parentElement;
        }

        this.$editor.querySelectorAll("button").forEach((btn) => {
          btn.className = "";
        });

        tagList.forEach((tag) => {
          const target = this.$editor.querySelector(tag).closest("button");

          target.className = "on";
        });
      }
    }
  });

  this.$editor.addEventListener("keyup", (e) => {
    const targetTagName = e.target.tagName;
    let value, name;

    if (targetTagName === "INPUT") {
      value = e.target.value;
      name = e.target.name;
    } else if (targetTagName === "DIV") {
      value = e.target.innerHTML;
      name = e.target.getAttribute("name");
    }

    const { id } = getItem("currentContentId", null);

    const nextState = {
      ...this.state.res_content,
      [name]: value,
    };

    if (this.state.res_content.id === Number(id)) {
      setItem("inProgressContent", nextState);
      setItem("currentContentId", { id, isNeedRender: false });
    }

    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      onEditing(nextState);
    }, 500);
  });
}
