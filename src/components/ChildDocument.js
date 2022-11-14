export default function ChildDocument({ $target, initialState }) {
  const $childDocument = document.createElement("div");
  $childDocument.className = "child-document";

  $target.appendChild($childDocument);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    $childDocument.innerHTML = `
      ${this.state.documents
        .map(
          (document) =>
            `${
              document
                ? `<div class="child-link">${document.title}</div>`
                : `<div>하위 페이지가 없음</div>`
            }`
        )
        .join("")}
    `;
  };

  $childDocument.addEventListener("click", (e) => {
    const $childList = e.target.closest(".child-link");
    if ($childList) {
      console.log(this.state.documents);
    }
  });
}
