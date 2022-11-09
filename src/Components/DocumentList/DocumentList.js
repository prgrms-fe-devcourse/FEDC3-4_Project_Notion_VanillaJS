import { isConstructor } from "../../Helpers/checkError.js";

export default function DocumentList({
  $target,
  initialState,
  createNewDocument,
  showChildDocument,
}) {
  isConstructor(new.target);
  const $documentList = document.createElement("ul");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    const documentList = await this.state;
    $documentList.innerHTML = `${documentList
      .map(
        ({ id, title }) => `
          <li data-id="${id}">
            <span id="title">${title}</span>
            <button id="createNewDocumentButton">➕</button>
            <button id="showChildDocumentButton">🔽</button>
          </li>`
      )
      .join("")}`;
  };

  $documentList.addEventListener("click", (e) => {
    if (e.target && e.target.id === "createNewDocumentButton") {
      createNewDocument({ $target: e.target });
    }

    if (e.target && e.target.id === "showChildDocumentButton") {
      showChildDocument({ $target: e.target });
    }
  });

  this.render();
}
