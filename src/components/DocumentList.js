import { push } from '../utils/router.js';
import {
  NEW,
  NEW_PARENT,
  ROUTE_DOCUMENTS,
  UNTITLED,
  ADD,
  DELETE,
} from '../utils/constants.js';
import { isNew } from '../utils/helper.js';
import { getItem, setItem } from '../utils/storage.js';

const DOCUMENT_ITEM = 'document-item';
const OPENED_ITEM = 'opened-item';
const BLOCK = 'block';
const NONE = 'none';

export default function DocumentList({ $target, initialState, onRemove }) {
  isNew(new.target);

  const $documentList = document.createElement('div');
  $documentList.className = 'document-list';
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  const generateTextIndent = (depth) => 10 * depth;

  let isBlock = false;

  const renderButton = (id) => {
    const openedItems = getItem(OPENED_ITEM, []);
    if (openedItems.includes(id)) {
      isBlock = true;
      return `
        <button class="toggle open" type="button">
          <i class="toggle open fa-solid fa-angle-down"></i>
        </button>
      `;
    } else {
      isBlock = false;
      return `
        <button class="toggle" type="button">
          <i class="toggle fa-solid fa-angle-right"></i>
        </button>
      `;
    }
  };

  const renderDocuments = (nextDocuments, depth) => `
        ${nextDocuments
          .map(
            ({ id, title, documents }) => `
            <ul>
              <li 
                data-id="${id}" 
                class="${DOCUMENT_ITEM}" 
                style="text-indent: ${generateTextIndent(depth)}px">
                ${renderButton(id)}
                <p class="${DOCUMENT_ITEM}">${
              title.length > 0 ? title : UNTITLED
            }</p>
                <div class="buttons">
                  <button class="${DELETE}" type="button">
                    <i class="fa-regular fa-trash-can ${DELETE}"></i>
                  </button>
                  <button class="${ADD}" type="button">
                    <i class="fa-solid fa-plus ${ADD}"></i>
                  </button>
                </div>
              </li>
              ${
                documents.length
                  ? renderDocuments(documents, depth + 2)
                  : `<li 
                      class="no-subpages" 
                      style="text-indent: ${generateTextIndent(
                        depth + 2
                      )}px; display: ${isBlock ? BLOCK : NONE};">
                      하위 페이지 없음
                    </li>`
              }
              </ul>
            `
          )
          .join('')}
    `;

  this.render = () => {
    const { documents } = this.state;

    $documentList.innerHTML = `
      ${documents.length > 0 ? renderDocuments(documents, 0) : ''}
    `;
  };

  $documentList.addEventListener('click', (e) => {
    const { target } = e;
    const $li = target.closest('li');
    if (!$li) return;

    let { id } = $li.dataset;
    id = parseInt(id);
    const openedItems = getItem(OPENED_ITEM, []);
    if (target.classList.contains(DOCUMENT_ITEM)) {
      push(`${ROUTE_DOCUMENTS}/${id}`);
    } else if (target.classList.contains(ADD)) {
      setItem(NEW_PARENT, id);
      push(`${ROUTE_DOCUMENTS}/${NEW}`);
    } else if (target.classList.contains(DELETE)) {
      onRemove(id);
    }

    if (!target.classList.contains('toggle')) return;

    if (target.classList.contains('open')) {
      const index = openedItems.indexOf(id);
      setItem(OPENED_ITEM, [
        ...openedItems.slice(0, index),
        ...openedItems.slice(index + 1),
      ]);
      target.classList.toggle('open');
      this.render();
    } else {
      setItem(OPENED_ITEM, [...openedItems, id]);
      target.classList.toggle('open');
      this.render();
    }
  });

  const toggleBlock = (e) => {
    const $li = e.target.closest('li');
    if (!$li) return;

    for (const node of $li.children) {
      if (
        node.classList.contains('buttons') ||
        node.classList.contains(DOCUMENT_ITEM)
      ) {
        node.classList.toggle(BLOCK);
      }
    }
  };

  $documentList.addEventListener('mouseover', toggleBlock);
  $documentList.addEventListener('mouseout', toggleBlock);

  this.render();
}
