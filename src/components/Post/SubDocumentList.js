import { createElement } from '../../utils/createElement.js';
import { historyPush } from '../../utils/router.js';
import {
  getItem,
  OPENED_DOCUMENT_ITEMS,
  setItem,
} from '../../utils/storage.js';

/**
 * state: {
 *  id: number,
 *  currentPath: string,
 *  subDocumentList: array
 * }
 */
export default function SubDocumentList({ $target, initialState }) {
  const $div = createElement({
    element: 'div',
    $target,
    className: 'sub-documents',
  });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { subDocumentList } = this.state;
    const { currentPath } = this.state;

    $div.innerHTML = `
      ${subDocumentList
        .map(
          ({ id, title }) => `
        <div class='document-item' title='${title}' data-current-path='${currentPath} > ${title}' data-id='${id}'>
          <div class='document-item__title'>${title}</div>
        </div>
      `,
        )
        .join('')}
    `;
  };

  $div.addEventListener('click', event => {
    event.stopPropagation();
    const { target } = event;
    const { id, currentPath } = target.closest('[data-id]').dataset;

    const openedDocumentItemIds = getItem(OPENED_DOCUMENT_ITEMS, []);
    if (!openedDocumentItemIds.includes(this.state.id)) {
      setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds, this.state.id]);
    }

    historyPush(`/documents/${id}?currentPath=${currentPath}`);
  });
}
