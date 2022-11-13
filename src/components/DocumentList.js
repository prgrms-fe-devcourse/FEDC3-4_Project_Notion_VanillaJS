import { setItem, getItem, removeItem } from "../utils/storage.js";
import { totalDocumentList } from "../utils/totalDocumentList.js";

export default function DocumentList({
  $target,
  initialState,
  onClickRootAdd,
  onClickRemove,
  onClickAdd,
}) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-page";
  $target.appendChild($documentList);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
      <button name="add-button" class="root-page-add-button">Add page</button>
      <div class="list-box"></div>
      ${totalDocumentList(this.state)}
      <div>
    `;
  };

  $documentList.addEventListener("click", (e) => {
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
      if (target.className === "root-page-add-button") {
        onClickRootAdd();
        return;
      }
      if (target.name === "remove-button") {
        onClickRemove(id);
        removeItem(listToggleState);
        return;
      }
      if (target.name === "add-button") {
        onClickAdd(id);
        return;
      }
    }
  });

  this.render();
}
