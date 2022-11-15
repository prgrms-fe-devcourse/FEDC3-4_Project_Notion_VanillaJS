export default function DocsSubList({ $target, initialState }) {
  const $docsSubList = document.createElement("div");
  $docsSubList.className = "docs-subList";

  $target.appendChild($docsSubList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $docsSubList.innerHTML = "";
    if (this.state.length > 0) {
      $docsSubList.innerHTML = `
        <ul>
          ${this.state
            .map((subDoc) => {
              return `
              <li  data-id="${subDoc.id}"> ${subDoc.title}  </li>
            `;
            })
            .join("")}
        </ul>
      
      `;
    }
  };
}
