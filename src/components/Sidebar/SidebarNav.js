import { validateInstance } from "../../utils/validation.js";
import { STORAGE_KEY, STATE, DEFAULT_TEXT } from "../../utils/constants.js";
import { getItem, setItem } from "../../utils/storage.js";
import { customEvent } from "../../utils/custom-event.js";

export default function SidebarBody({
  $target,
  initialState,
  onOpenList,
  onCreateDocument,
  onDeleteDocument,
}) {
  validateInstance(new.target);

  const $nav = document.createElement("nav");
  $nav.classList.add("sidebar-nav");

  $target.appendChild($nav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $nav.innerHTML = "";
    $nav.innerHTML = `
      <ul class="post-list">
        ${createDocument(this.state, 0)}
      </ul>`;
  };

  const renderChildrenDocument = (documents, depth) => {
    const padding = depth === 1 ? 22 : depth * 12;

    if (documents.length) {
      return `
        <ul class="post-list">
          ${createDocument(documents, depth + 1)}
        </ul>`;
    }

    return `
      <li class="post-item">
        <div class="no-post-item" style="margin-left: ${padding}px;">
          하위 페이지 없음
        </div>
      </li>`;
  };

  const createDocument = (childDocuments, depth) => {
    return childDocuments
      .map(({ id, title, documents }) => {
        const openedItems = getItem(STORAGE_KEY.OPENED_LIST, []);
        const isSelected =
          Number(getItem(STORAGE_KEY.SELECTED_DOCUMENT, null)) === id;

        const isOpened = (openedItems && openedItems[id]) || false;
        const padding = depth * 8;
        const buttonDirection = isOpened ? "is-rotate" : "";

        return `
          <li class="post-item" data-id=${id}>
            <div class="post-item-container ${isSelected ? "is-active" : ""}">
              <div class="post-item-container-left">
                <button class="post-item-button open-button" style="margin-left: ${padding}px;">
                  <img class="${buttonDirection}" src="/src/assets/arrow.svg" />
                </button>
                <div class="icon-document">
                  <img src="/src/assets/document.svg" />
                </div>
                <div class="title">${title ? title : DEFAULT_TEXT.TITLE}</div>
              </div>
              <div class="post-item-container-right hide">
                <button class="post-item-button delete-button" title="페이지 삭제">
                  <img src="/src/assets/trash.svg" />
                </button>
                <button class="post-item-button create-button" title="하위 페이지 추가">
                  <img src="/src/assets/plus.svg" alt="create new post" />
                </button>
              </div>
            </div>
            ${isOpened ? renderChildrenDocument(documents, depth + 1) : ""}
          </li>`;
      })
      .join("");
  };

  $nav.addEventListener("click", async (e) => {
    const $button = e.target.closest("button");
    const $postItem = e.target.closest("li");

    if ($button) {
      const $postItem = $button.closest("li");
      const className = $button.classList;
      const id = Number($postItem.dataset.id);

      if (className.contains("open-button")) {
        const $svg = $button.querySelector("img");
        $svg.classList.toggle("is-rotate");
        onOpenList(STATE.OPEN, id);
      } else if (className.contains("create-button")) {
        onCreateDocument(id);
        onOpenList(STATE.CREATE, id);
      } else if (className.contains("delete-button")) {
        const deleteIdList = await onDeleteDocument(id);
        onOpenList(STATE.DELETE, deleteIdList);
      }
    }

    if ($postItem) {
      const { id } = $postItem.dataset;
      setItem(STORAGE_KEY.SELECTED_DOCUMENT, id);

      customEvent.push(`/documents/${id}`);
    }
  });
}
