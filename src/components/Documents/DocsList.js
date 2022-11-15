export default function DocsList({ $target, initialState }) {
  const $docsList = document.createElement("div");

  $docsList.className = "docs-list";

  $target.appendChild($docsList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.makeMarkup = (docsList) => {
    const markup = `
      <ul>
        ${docsList
          .map((doc) => {
            return `<li data-id=${doc.id}> ${doc.title} </li>
              ${
                doc.documents && doc.documents.length > 0
                  ? this.makeMarkup(doc.documents)
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
    if (this.state.length > 0) {
      $docsList.innerHTML = this.makeMarkup(this.state);
    } else {
      $docsList.innerHTML = `
        <span> No documents </span>
      `;
    }
  };
}
