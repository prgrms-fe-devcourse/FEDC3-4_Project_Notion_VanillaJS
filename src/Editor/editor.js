import { request } from "../../Api/api.js";

export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");
  const $div = document.createElement("div");
  $editor.setAttribute("class", "right");
  $div.setAttribute("class", "editor");

  $target.appendChild($editor);
  $editor.appendChild($div);

  this.state = initialState;

  this.handleRevise = () => {
    const plusEvent = new CustomEvent("@ReviseCompleted");
    $editor.dispatchEvent(plusEvent);
  };

  this.render = () => {
    $div.innerHTML = `
      <input type="text" name="title" placeholder="제목 없음" />
      <div class="content-container" name="content" contentEditable="true" placeholder="내용을 입력해주세요."></div>
      `;
  };
  this.render();

  this.setState = (nextState) => {
    this.state = nextState;
    $div.querySelector("[name=title]").value = this.state.title;
    $div.querySelector("[name=content]").innerHTML = this.state.content;
  };

  $div.querySelector("[name=title]").addEventListener("keyup", async (e) => {
    e.preventDefault();
    const $input = $div.querySelector("input");
    await request(`/documents/${this.state.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: $input.value,
      }),
    });
    this.handleRevise();
  });

  $editor
    .querySelector("[name=content]")
    .addEventListener("input", async (e) => {
      e.preventDefault();
      await request(`/documents/${this.state.id}`, {
        method: "PUT",
        body: JSON.stringify({
          content: e.target.innerHTML,
        }),
      });
      this.handleRevise();
    });
}
