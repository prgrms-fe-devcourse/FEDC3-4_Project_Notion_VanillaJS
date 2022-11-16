import { DELETE, UNTITLED } from '../utils/constants.js';

export default function DocumentHeader({ $target, initialState, onDelete }) {
  const $header = document.createElement('header');
  $header.className = 'document-header';

  $target.appendChild($header);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    const { title } = this.state.document;

    $header.innerHTML = `
      <div>
        <span class="title">${title?.length > 0 ? title : UNTITLED}</span>
      </div>
      <div class="buttons">
        <button title="삭제" class="${DELETE}" type="button">
            <i title="삭제" class="fa-regular fa-trash-can ${DELETE}"></i>
        </button>
      </div>
    `;
  };

  $header.addEventListener('click', (e) => {
    const { target } = e;

    if (target.classList.contains('delete')) {
      onDelete(this.state.documentId);
    }
  });

  this.render();
}
