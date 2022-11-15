import { CheckNew } from "./Error.js";

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
    if (this.state.title === "새 문서의 제목을 입력하세요.") {
      $editor.querySelector("[name=title]").value = "";
      $editor.querySelector("[name=title]").placeholder =
        "제목을 입력해주세요.";

      $editor.querySelector("[name=content]").value = "";
      $editor.querySelector("[name=content]").placeholder =
        "제목을 먼저 입력해주세요. 내용을 입력하시면 1초뒤에 문서가 생성되고 저장됩니다.";
    } else {
      $editor.querySelector("[name=title]").value = this.state.title;
      $editor.querySelector("[name=content]").value = this.state.content;
    }
    //this.render();
  };

  // let isInit = false;

  // this.render = () => {
  //   // 얘도 밖으로 뺴도 될듯..?
  //   if (!isInit) {
  //     isInit = true;
  //   }
  // };
  // this.render();

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
