import { EVENT } from '../utils/constants.js';

export default function Modal({ target, initialState = { documents: [] }, onClickDocument }) {
  const $modal = document.createElement('div');
  $modal.classList.add('modal');

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
  };

  this.setEvent = () => {
    const $modalContents = $modal.querySelectorAll('.modal-contents');
    [].forEach.call($modalContents, ($modalContent) => {
      $modalContent.addEventListener(EVENT.CLICK, (e) => {
        const targetDocumentId = e.target.getAttribute('key');
        const targetDocumentTitle = e.target.innerHTML;
        const $currentTarget = target.querySelector('.current-link');
        const $span = document.createElement('span');

        $span.classList.add('link-button');
        $span.innerHTML = `[Doc] ${targetDocumentTitle}`;
        $currentTarget.innerHTML = $currentTarget.innerHTML.slice(0, -1);
        $currentTarget.appendChild($span);

        $span.addEventListener(EVENT.CLICK, (e) => {
          onClickDocument(targetDocumentId);
        });
        this.empty();
      });
    });

    const $cancelButton = $modal.querySelector('.cancel-button');
    $cancelButton.addEventListener(EVENT.CLICK, (e) => {
      this.empty();
    });
  };

  const getDocuments = (array, documents) => {
    if (documents.length === 0) return array;
    documents.map((document) => {
      array.push({ id: document.id, title: document.title });
      if (document.documents.length > 0) getDocuments(array, document.documents);
    });
    return array;
  };

  this.render = () => {
    target.appendChild($modal);
    const documents = getDocuments([], this.state.documents);
    $modal.innerHTML = `
      <div class='modal-wrapper'>
        <div class='modal-header'>
          페이지 링크
          <div class='cancel-button'>X</div>
        </div>
        <div class='modal-content'>
        ${documents
          .map((document) => {
            const { id, title } = document;
            return `
                <div class='modal-contents' key='${id}'>${title}</div>
              `;
          })
          .join('')}
          </div>
        </div>
    `;
    this.setEvent();
  };

  this.empty = () => {
    target.removeChild($modal);
    $modal.innerHTML = '';
  };
}
