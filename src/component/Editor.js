import { CheckNew } from "../utils/error.js";

export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  CheckNew(new.target);

  const $editor = document.createElement("div");

  this.state = initialState;

  $editor.innerHTML = `      
      <input type="text" name="title" style="width:95%;display:flex" value="${this.state.title}" />
      <textarea name="content" style="width:95%; height:600px">${this.state.content}</textarea>
    `;

  this.setState = (nextState) => {
    this.state = nextState;
    if (
      (this.state.title === "제목 없음" || this.state.title === "") &&
      this.state.content === ""
    ) {
      $editor.querySelector("[name=title]").value = "";
      $editor.querySelector("[name=title]").placeholder =
        "제목을 입력하지 않으면 자동으로 '제목 없음'이 제목이 됩니다.";

      $editor.querySelector("[name=content]").value = "";
      $editor.querySelector("[name=content]").placeholder =
        "내용을 수정하시면 1초뒤에 문서가 자동 저장됩니다.";
    } else {
      $editor.querySelector("[name=title]").value = this.state.title;
      $editor.querySelector("[name=content]").value = this.state.content;
    }
  };

  $editor.addEventListener("keyup", (e) => {
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

  $target.appendChild($editor);
}
