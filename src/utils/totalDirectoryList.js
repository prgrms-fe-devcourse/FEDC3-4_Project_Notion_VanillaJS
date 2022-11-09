import { getItem } from "./storage.js";

export const totalDirectoryList = (directorys) => {
  if (Array.isArray(directorys)) {
    return `
    <ul>
      ${directorys
        .map((directory) => {
          const listToggleState = `isOpened-${directory.id}`;
          const display = getItem(listToggleState) || "none";
          return `
            <li data-id="${directory.id}" name="list">
            <span class="list-title"><button class="toggle-button" isClosed="true">></button>${
              directory.title
            }</span>
            <span class="list-button"><button name="add-button" data-id="${
              directory.id
            }">+</button>
            <button name="remove-button" data-id=${directory.id}>-</button></span>
              ${
                directory.documents.length
                  ? `<ul style="display: ${display}">${totalDirectoryList(
                      directory.documents
                    )}</ul>`
                  : `<ul style="display: ${display}"><li>하위 페이지가 없습니다.</li></ul>`
              }
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
  }
};
