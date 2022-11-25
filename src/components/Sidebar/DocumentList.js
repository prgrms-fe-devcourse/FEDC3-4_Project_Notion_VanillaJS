import DocumentAddButton from './DocumentAddButton.js';

import { push } from '../../utils/router.js';
import { CLASS_NAME, KEY, TEXT } from '../../utils/constants.js';
import {
  isNew,
  generateTitle,
  generateTextIndent,
  generateRouteDocuments,
} from '../../utils/helper.js';
import { getStorageItem, setStorageItem } from '../../utils/storage.js';

export default function DocumentList({
  $target,
  initialState,
  onAdd,
  onDelete,
}) {
  isNew(new.target);

  const $documentList = document.createElement('div');
  $documentList.className = CLASS_NAME.DOCUMENT_LIST;
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  let isBlock = false;

  const renderButton = (id) => {
    const openedItems = getStorageItem(KEY.OPENED_ITEMS, []);
    isBlock = openedItems.includes(id);
    return `
      <button class="${CLASS_NAME.TOGGLE} ${
      isBlock ? CLASS_NAME.OPEN : ''
    }" type="button">
        <i class="${CLASS_NAME.TOGGLE} ${
      isBlock ? CLASS_NAME.OPEN : ''
    } fa-solid fa-angle-${isBlock ? 'down' : 'right'}"></i>
      </button>
    `;
  };

  const renderDocuments = (nextDocuments, depth) => `
        ${nextDocuments
          .map(
            ({ id, title, documents }) => `
            <ul>
              <li 
                data-id="${id}" 
                class="${CLASS_NAME.DOCUMENT_ITEM} ${
              id === this.state.selectedId ? CLASS_NAME.SELECTED : ''
            }" 
                style="padding-left: ${generateTextIndent(depth)}px">
                ${renderButton(id)}
                <p class="${CLASS_NAME.DOCUMENT_ITEM}">${generateTitle(
              title
            )}</p>
                <div class="${CLASS_NAME.BUTTONS}">
                  <button class="${CLASS_NAME.DELETE}" type="button">
                    <i class="fa-regular fa-trash-can ${CLASS_NAME.DELETE}"></i>
                  </button>
                  <button class="${CLASS_NAME.ADD}" type="button">
                    <i class="fa-solid fa-plus ${CLASS_NAME.ADD}"></i>
                  </button>
                </div>
              </li>
              ${
                isBlock && documents.length
                  ? renderDocuments(documents, depth + 2)
                  : `<li 
                      class="${CLASS_NAME.NO_SUBPAGES}" 
                      style="
                        padding-left: ${generateTextIndent(depth + 2)}px; 
                        display: ${isBlock ? 'block' : 'none'};
                      ">
                      하위 페이지 없음
                    </li>`
              }
              </ul>
            `
          )
          .join('')}
    `;

  const documentAddButton = new DocumentAddButton({
    $target: $documentList,
    initialState: {
      position: CLASS_NAME.DOCUMENT_LIST_BOTTOM,
      text: TEXT.ADD_PAGE,
    },
    onAdd,
  });

  this.render = () => {
    const { documents } = this.state;

    $documentList.innerHTML = `
      ${documents.length > 0 ? renderDocuments(documents, 1) : ''}
    `;

    documentAddButton.render();
  };

  $documentList.addEventListener('click', (e) => {
    const { target } = e;
    const $li = target.closest('li');
    if (!$li) return;

    let { id } = $li.dataset;
    id = parseInt(id);

    if (target.classList.contains(CLASS_NAME.DOCUMENT_ITEM)) {
      push(generateRouteDocuments(id));
      this.render();
    } else if (target.classList.contains(CLASS_NAME.ADD)) {
      setStorageItem(KEY.NEW_PARENT, id);
      onAdd(id);
      toggleOpen(target, id);
    } else if (target.classList.contains(CLASS_NAME.DELETE)) {
      onDelete(this.state.selectedId, id);
    }

    if (target.classList.contains(CLASS_NAME.TOGGLE)) {
      toggleOpen(target, id);
    }
  });

  const toggleOpen = (target, id) => {
    const openedItems = getStorageItem(KEY.OPENED_ITEMS, []);

    if (target.classList.contains(CLASS_NAME.OPEN)) {
      const index = openedItems.indexOf(id);
      setStorageItem(KEY.OPENED_ITEMS, [
        ...openedItems.slice(0, index),
        ...openedItems.slice(index + 1),
      ]);
      target.classList.toggle(CLASS_NAME.OPEN);
    } else {
      if (openedItems.indexOf(id) > -1) return;
      setStorageItem(KEY.OPENED_ITEMS, [...openedItems, id]);
      target.classList.toggle(CLASS_NAME.OPEN);
    }

    this.render();
  };

  const toggleButtonBlock = (e) => {
    const $li = e.target.closest('li');
    if (!$li) return;

    for (const element of $li.children) {
      if (
        element.classList.contains(CLASS_NAME.BUTTONS) ||
        element.classList.contains(CLASS_NAME.DOCUMENT_ITEM)
      ) {
        element.classList.toggle('block');
      }
    }
  };

  $documentList.addEventListener('mouseover', toggleButtonBlock);
  $documentList.addEventListener('mouseout', toggleButtonBlock);

  this.render();
}
