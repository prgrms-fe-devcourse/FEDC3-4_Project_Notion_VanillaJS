import { EVENT, TEXT } from '../utils/constants.js';
import { getDocumentsByKeyword } from '../utils/getDocuments.js';

export default function Modal({
  $target,
  initialState = { documents: [], position: { x: 0, y: 0 }, keyword: '' },
  onEditing,
}) {
  const $wrapper = document.createElement('div');
  $wrapper.classList.add('modal-wrapper');

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
  };

  $wrapper.addEventListener(EVENT.CLICK, () => {
    const $currentTarget = $target.querySelector('.current-link');

    $currentTarget.classList.remove('current-link');
    $currentTarget.classList.remove();

    this.remove();
  });

  this.setEvent = () => {
    const $modal = $wrapper.querySelector('.modal');
    const $modalContents = $modal.querySelectorAll('.modal-contents');
    const $modalHeader = $modal.querySelector('.modal-header');

    if ($modal) {
      const { x, y } = this.state.position;

      $modal.style.left = `${$wrapper.clientWidth < x + 330 ? x - 330 : x}px`;
      $modal.style.top = `${y > 420 ? y - 320 : y + 20}px`;

      $modal.addEventListener(EVENT.CLICK, (e) => {
        e.stopPropagation();
      });
    }

    if ($modalContents && $modalContents.length) {
      [].forEach.call($modalContents, ($modalContent) => {
        $modalContent.addEventListener(EVENT.CLICK, (e) => {
          const targetDocumentId = e.target.getAttribute('key');
          const targetDocumentTitle = e.target.innerHTML;
          const $documentLink = document.createElement('span');
          const $documentLinkTarget = $target.querySelector('.current-link');

          $documentLink.classList.add('document-link');
          $documentLink.setAttribute('contenteditable', false);
          $documentLink.innerHTML = targetDocumentTitle;
          $documentLink.setAttribute('key', targetDocumentId);
          $documentLinkTarget.innerHTML = $documentLinkTarget.innerHTML.slice(
            0,
            -(this.state.keyword.length + 1),
          );
          $documentLinkTarget.appendChild($documentLink);
          $documentLinkTarget.classList.remove('current-link');

          onEditing($target.querySelector('.editor-content').innerHTML);
          this.remove();
        });
      });
    }

    $modalHeader.addEventListener(EVENT.MOUSEDOWN, (e) => {
      e.preventDefault();
      this.setState({ position: { x: e.clientX, y: e.clientY } });

      $modalHeader.classList.add('active');
      $wrapper.addEventListener(EVENT.MOUSEUP, removeMouseMove);
      $wrapper.addEventListener(EVENT.MOUSEMOVE, onMouseMove);
    });
  };

  const removeMouseMove = () => {
    const $modalHeader = $wrapper.querySelector('.modal-header');

    $modalHeader.classList.remove('active');
    $wrapper.removeEventListener(EVENT.MOUSEUP, removeMouseMove);
    $wrapper.removeEventListener(EVENT.MOUSEMOVE, onMouseMove);
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    const $modal = $wrapper.querySelector('.modal');
    const { x, y } = this.state.position;

    const moveX = x - e.clientX;
    const moveY = y - e.clientY;
    this.setState({ position: { x: e.clientX, y: e.clientY } });

    $modal.style.left = `${$modal.offsetLeft - moveX}px`;
    $modal.style.top = `${$modal.offsetTop - moveY}px`;
  };

  this.render = () => {
    $target.appendChild($wrapper);
    const { documents, keyword } = this.state;
    const searchedDocuments = getDocumentsByKeyword([], documents, keyword);

    $wrapper.innerHTML = `
      <div class='modal'>
        <div class='modal-header'>${TEXT.DEFAULT_MODAL_HEADER}</div>
        <div class='modal-content'>
          ${searchedDocuments
            .map((searchedDocument) => {
              const { id, title } = searchedDocument;
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

  this.remove = () => {
    if ($target.querySelector('.modal-wrapper')) {
      $target.removeChild($wrapper);
      $wrapper.innerHTML = '';
    }
  };
}
