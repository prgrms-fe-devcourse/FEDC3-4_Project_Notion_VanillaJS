import { push } from "./router.js";

export default function LinkButton({ $target, initialState }) {
  const $linkButton = document.createElement("button");
  this.state = initialState;

  $target.appendChild($linkButton);
  this.render = () => {
    $linkButton.textContent = this.state.text;
  };
  this.render();

  $linkButton.addEventListener("click", () => {
    push(this.state.link);
  });
}
