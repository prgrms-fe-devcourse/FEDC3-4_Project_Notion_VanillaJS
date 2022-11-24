import { push } from "../utils/router.js";
import { CheckNew } from "../utils/error.js";

export default function LinkButton({ $target, initialState }) {
  CheckNew(new.target);

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
