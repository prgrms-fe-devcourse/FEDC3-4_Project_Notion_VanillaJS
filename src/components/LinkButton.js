import { push } from "../utils/router.js";

export default function LinkButton({ $target, initialState, className }) {
  this.state = initialState;

  const $linkButton = document.createElement("button");
  $linkButton.setAttribute("class", className);
  $target.appendChild($linkButton);

  this.render = () => {
    $linkButton.textContent = this.state.text;
  };

  this.render();

  $linkButton.addEventListener("click", () => {
    push(this.state.link);
  });
}
