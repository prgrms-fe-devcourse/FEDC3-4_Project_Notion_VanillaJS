import { push } from "../utils/router.js";

export default function LinkButton({ $target, initialState }) {
  if (!(this instanceof LinkButton)) {
    throw new Error("new로 생성하지 않았습니다.");
  }
  const $linkButton = document.createElement("button");
  $target.appendChild($linkButton);

  this.state = initialState;

  this.render = () => {
    $linkButton.textContent = this.state.text;
  };

  this.render();

  $linkButton.addEventListener("click", async () => {
    push(this.state.link);
  });
}
