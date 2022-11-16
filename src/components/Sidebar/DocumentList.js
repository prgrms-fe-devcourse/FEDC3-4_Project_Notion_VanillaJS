import { createElement } from '../../utils/createElement.js';
import { historyPush } from '../../utils/router.js';
import { getItem, OPENED_DOCUMENT_ITEMS } from '../../utils/storage.js';
import templates from '../../utils/templates.js';

/**
 * state: array
 */
export default function DocumentList({
  $target,
  initialState = [],
  onClickDocumentItemAddButton,
  onClickDocumentItemDeleteButton,
  onClickDocumentItemToggleButton,
}) {
  const $documentList = createElement({
    element: 'div',
    $target,
    className: 'document-list__root',
  });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const openedDocumentItems = getItem(OPENED_DOCUMENT_ITEMS, []);
    $documentList.innerHTML = `
			${this.state
        .map(
          ({ id, title, documents: subDocumentList }) => `
				${templates.rootDocumentListItem(
          id,
          title,
          subDocumentList,
          openedDocumentItems,
        )}
			`,
        )
        .join('')}
		`;
  };

  this.render();

  $documentList.addEventListener('click', async event => {
    event.stopPropagation();

    const { target } = event;
    if (
      [
        'document-list',
        'document-list__root',
        'document-item-container',
        'no-sub-document',
      ].includes(target.className)
    )
      return;
    const { action } = target.dataset;
    const { id, currentPath } = target.closest('[data-id]').dataset;

    if (action) {
      switch (action) {
        case 'add':
          onClickDocumentItemAddButton(id, currentPath);
          break;
        case 'delete':
          onClickDocumentItemDeleteButton(id);
          break;
        case 'toggle':
          onClickDocumentItemToggleButton(id);
          break;
      }
    }

    if (!action && id)
      historyPush(`/documents/${id}?currentPath=${currentPath}`);
  });
}
