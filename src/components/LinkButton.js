export default function LinkButton({ $target, initialState }) {
  this.state = initialState;

  const $linkButton = document.createElement("button");
  $target.appendChild($linkButton);

  this.render = () => {
    $linkButton.textContent = this.state.text;
  };

  this.render();
}
