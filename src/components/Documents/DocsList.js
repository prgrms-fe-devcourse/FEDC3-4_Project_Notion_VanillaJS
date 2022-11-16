import { push } from "../utils/router/router.js";

export default function DocsList({ $target, initialState, onClick, onDelete }) {
  const $docsList = document.createElement("div");

  $docsList.className = "docs-list";

  $target.appendChild($docsList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.setMarkup = (docsList) => {
    const markup = `
      <ul>
        ${docsList
          .map((doc) => {
            return `<li class="item" data-id=${doc.id}> 
              <span name="item-content"> ${doc.title} </span> 
              <button name="add" > + </button> 
              <button name="delete"> - </button>
            </li>
              ${
                doc.documents && doc.documents.length > 0
                  ? this.setMarkup(doc.documents)
                  : ""
              }
            `;
          })
          .join("")}
      </ul>
    `;
    return markup;
  };

  this.render = () => {
    $docsList.innerHTML = "";
    if (this.state.length > 0) {
      $docsList.innerHTML =
        this.setMarkup(this.state) +
        `<button name="add" > + 새 문서 만들기 </button>`;
    } else {
      $docsList.innerHTML = `
        <span> No documents </span>
        <button name="add" > + 새 문서 만들기 </button>
      `;
    }
  };

  $docsList.addEventListener("click", (e) => {
    const { target } = e;
    const tempTitle = "문서 제목";
    const $li = target.closest("li");
    if (target.tagName === "BUTTON") {
      const id = $li?.dataset.id;
      if (target.name === "add") {
        onClick({ parent: id || null, title: tempTitle });
      } else if (target.name === "delete") {
        onDelete({ id });
      }
    } else if (target.getAttribute("name") === "item-content") {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }
  });
}
