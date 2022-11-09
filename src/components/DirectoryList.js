import { setItem, getItem, removeItem } from "../utils/storage.js";

export default function DirectoryList({ $target, initialState }) {
  const $directoryList = document.createElement("div");
  $target.appendChild($directoryList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const totalDirectoryList = (directorys) => {
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
  };

  this.render = () => {
    $directoryList.innerHTML = `
      <button name="add-button" class="root-page-add-button">Add page</button>
      <div class="list-box"></div>
      ${totalDirectoryList(this.state)}
      <div>
    `;
  };

  this.render();

  $directoryList.addEventListener("click", (e) => {
    const { target } = e;
    const element = target.closest("[name]");

    if (element) {
      const { id } = element.dataset;
      const listToggleState = `isOpened-${id}`;
      if (target.className === "toggle-button") {
        const getToggleState = getItem(listToggleState);
        getToggleState
          ? removeItem(listToggleState)
          : setItem(listToggleState, "block");
        this.render();

        return;
      }
    }
  });
}
