import { push } from "../util/router.js";

export default function LinkButton({ $target, initialState }) {
  this.$linkButton = document.createElement("div");
  this.state = initialState;

  $target.appendChild(this.$linkButton);
  this.render = () => {
    this.$linkButton.innerHTML = this.state.text;
  };

  this.render();
  this.$linkButton.addEventListener("click", () => {
    push(this.state.link);
  });
}
