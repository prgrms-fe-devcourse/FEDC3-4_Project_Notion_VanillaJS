export default function DocsList({ $target, initialState, onClick }) {
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
            return `<li data-id=${doc.id}> ${
              doc.title
            } <button> + </button> </li>
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
      $docsList.innerHTML = this.setMarkup(this.state) + "<button> + </button>";
    } else {
      $docsList.innerHTML = `
        <span> No documents </span>
        <button> + </button>
      `;
    }
  };

  $docsList.addEventListener("click", (e) => {
    const { target } = e;
    const tempTitle = "문서 제목";
    if (target.tagName === "BUTTON") {
      const $li = target.closest("li");
      if ($li) {
        const { id } = $li.dataset;
        onClick({ parent: id, title: tempTitle });
      } else {
        onClick({ parent: null, title: tempTitle });
      }
    }
  });
}
