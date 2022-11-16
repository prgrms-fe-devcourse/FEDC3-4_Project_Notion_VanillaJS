import { push } from "../../utils/router.js";

export default function LinkButton({ $target, initialState }) {
  if (!(this instanceof LinkButton)) {
    throw new Error("new로 생성하지 않았습니다.");
  }

  this.state = initialState;

  const $linkButton = document.createElement("button");

  $linkButton.setAttribute("class", this.state.id);
  $target.appendChild($linkButton);

  this.render = () => {
    $linkButton.innerHTML = this.state.text;
  };

  this.render();

  $linkButton.addEventListener("click", async () => {
    push(this.state.link);
  });
}
