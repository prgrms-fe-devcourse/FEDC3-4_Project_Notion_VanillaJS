import { push } from "../utils/router/router.js";

export default function DocsList({ $target, initialState, onAdd, onDelete }) {
  const $docsList = document.createElement("div");

  $docsList.className = "docs-list";

  $target.appendChild($docsList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.setMarkup = (docsList, hide = false) => {
    const markup = `
      <ul class=${hide ? "hidden" : ""} >
        ${docsList
          .map((doc) => {
            return `<li class="item" data-id=${doc.id}> 
              <span name="item-content"> ${doc.title} </span> 
              <button name="add" > + </button> 
              <button name="delete"> - </button>
            </li>
              ${
                doc.documents && doc.documents.length > 0
                  ? this.setMarkup(
                      doc.documents,
                      !this.state.selectedDocs.has(`${doc.id}`)
                    )
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
    if (this.state.docs && this.state.docs.length > 0) {
      $docsList.innerHTML =
        this.setMarkup(this.state.docs) +
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
        this.setState({ selectedDocs: this.state.selectedDocs.add(id) });
        onAdd({ parent: id || null, title: tempTitle });
      } else if (target.name === "delete") {
        onDelete({ id });
      }
    } else if (target.getAttribute("name") === "item-content") {
      const id = $li?.dataset.id;
      const selectedDocs = this.state.selectedDocs;

      // toggle
      if (selectedDocs.has(id)) {
        selectedDocs.delete(id);
      } else {
        selectedDocs.add(id);
      }
      this.setState({ selectedDocs });
      push(`/documents/${id}`);
    }
  });
}
