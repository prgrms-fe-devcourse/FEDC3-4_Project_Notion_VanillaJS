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
        return `
          <li data-id="${id}">
            <span id="title">${title}</span>
            <button id="postDocumentButton">➕</button>
            <button id="showChildDocumentButton">🔽</button>
            <button id="deleteDocumentButton">❌</button>
            <span id="title">세부항목 : ${documents.length}</span>
          </li>`;
      })
      .join("")}`;
  };

  this.render();
}
