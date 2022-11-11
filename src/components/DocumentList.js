import { push } from '../utils/router.js';
import {
  NEW,
  NEWPARENT,
  ROUTE_DOCUMENTS,
  UNTITLED,
} from '../utils/contants.js';
import { isNew } from '../utils/helper.js';
import { setItem } from '../utils/storage.js';

const DOCUMENT_ITEM = 'document-list-item';
const ADD = 'add';

export default function DocumentList({ $target, initialState }) {
  isNew(new.target);

  const $documentList = document.createElement('div');
  $documentList.className = 'document-list';
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (nextDocuments) => `
      <ul>
        ${nextDocuments
          .map(
            ({ id, title, documents }) => `
              <li data-id="${id}" class="${DOCUMENT_ITEM}">
                ${title.length > 0 ? title : UNTITLED}
                <button class="${ADD}" type="button">
                  <i class="fa-solid fa-plus add-icon"></i>
                </button>
              </li>
              ${
                documents.length
                  ? renderDocuments(documents)
                  : '<li class="no-subpages">No pages inside</li>'
              }
            `
          )
          .join('')}
      </ul>
    `;

  this.render = () => {
    if (this.state.length > 0) {
      $documentList.innerHTML = renderDocuments(this.state);
    }
  };

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if (!$li) return;

    const { id } = $li.dataset;
    if (e.target.className === DOCUMENT_ITEM) {
      push(`${ROUTE_DOCUMENTS}/${id}`);
    } else if (e.target.className === ADD) {
      setItem(NEWPARENT, id);
      push(`${ROUTE_DOCUMENTS}/${NEW}`);
    }
  });

  this.render();
}
