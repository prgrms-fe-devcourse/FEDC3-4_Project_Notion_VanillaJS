import { getItem } from "./storage.js";

export const totalDocumentList = (documents) => {
  if (Array.isArray(documents)) {
    return `
    <ul>
      ${documents
        .map((rootDocument) => {
          const listToggleState = `isOpened-${rootDocument.id}`;
          const listClicked = `${rootDocument.id}-clicked`;
          const display = getItem(listToggleState) || "none";
          const isClicked =
            getItem("isClicked") === listClicked ? "Clicked" : "unClicked";
          return `
          <div class="focusable">
            <li data-id="${rootDocument.id}" class="${isClicked}" name="list">
            <span class="list-title"><button class="toggle-button ${display}">></button>${
            rootDocument.title
          }</span>
            <span class="list-button"><button name="add-button" data-id="${
              rootDocument.id
            }">➕</button>
            <button name="remove-button" data-id=${rootDocument.id}>➖</button></span>
            </div>
              ${renderList(rootDocument.documents, display)}
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
  }
};

const renderList = (documents, display) =>
  documents.length
    ? `<ul class="child" style="${display}">${totalDocumentList(documents)}</ul>`
    : `<ul stlye="${display}"><li><i>하위 페이지 없음</i></li></ul>`;
