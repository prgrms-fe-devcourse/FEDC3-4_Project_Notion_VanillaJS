import { push } from "../router.js";

export default function ChildDocument({ $target, initialState }) {
  const $childDocument = document.createElement("div");
  $childDocument.className = "child-document";

  $target.appendChild($childDocument);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $childDocument.innerHTML = `
      ${this.state.documents
        .map((document) => {
          return `
            ${
              document
                ? `<div data-id="${document.id}" class="child-link">${document.title}</div>`
                : `<div>하위 페이지가 없음</div>`
            }
            `;
        })
        .join("")}
    `;
  };

  $childDocument.addEventListener("click", (e) => {
    const $childList = e.target.closest(".child-link");
    const { id } = $childList.dataset;
    if ($childList) {
      push(`/documents/${id}`);
    }
  });
}
