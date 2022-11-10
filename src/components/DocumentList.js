import { push } from '../utils/router.js';
import { NEW, ROUTE_DOCUMENTS, UNTITLED } from '../utils/contants.js';
import { isNew } from '../utils/helper.js';

const DOCUMENT_ITEM = 'document-item';
const ADD = 'add';

export default function DocumentList({ $target, initialState }) {
  isNew(new.target);

  const $documentList = document.createElement('div');
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
                <button class="${ADD}" type="button">+</button>
              </li>
              ${
                documents.length
                  ? renderDocuments(documents)
                  : 'No pages inside'
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
      push(`${ROUTE_DOCUMENTS}/${NEW}`);
    }
  });

  this.render();
}
