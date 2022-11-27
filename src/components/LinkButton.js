import { push } from "../util/router.js";

export default function LinkButton({ $target, initialState, className }) {
  const $linkButton = document.createElement("div");
  $linkButton.classList.add(className);
  this.state = initialState;

  $target.appendChild($linkButton);
  this.render = () => {
    $linkButton.innerHTML = this.state.text;
  };

  this.render();
  $linkButton.addEventListener("click", () => {
    push(this.state.link);
  });
}
