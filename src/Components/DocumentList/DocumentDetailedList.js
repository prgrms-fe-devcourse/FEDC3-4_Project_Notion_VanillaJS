import { isConstructor } from "../../Helpers/checkError.js";

export default function DocumentDetailedList({ $target, initialState }) {
  isConstructor(new.target);
  const $documentList = document.createElement("ul");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = await nextState;
    this.render();
  };

  this.render = async () => {
    const documentList = await this.state;
    $documentList.innerHTML = `${documentList
      .map(({ id, title, documents }) => {
        const isDocument = documents.length > 0;
        return `
          <li data-id="${id}">
            <span id="title">${title}</span>
            <button id="postDocumentButton">➕</button>
            ${
              isDocument
                ? `<button id="showChildDocumentButton">🔽</button>`
                : ``
            }
            <button id="deleteDocumentButton">❌</button>
          </li>`;
      })
      .join("")}`;
  };

  this.render();
}
