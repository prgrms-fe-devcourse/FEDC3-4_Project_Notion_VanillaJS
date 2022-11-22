export default function Saving({ $target, initialState }) {
  const $loading = document.createElement("div");
  $loading.className = "isSaved";
  this.state = initialState;
  // state = remove | true | false

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state === "remove") {
      $loading.innerHTML = "";
    } else {
      $loading.innerHTML = `
      <div class=${this.state ? "loading" : "saved"}>
        ${this.state ? `<div id="loading"></div> 저장중` : "저장 완료"}
      </div>
    `;
    }
  };

  $target.prepend($loading);
}
