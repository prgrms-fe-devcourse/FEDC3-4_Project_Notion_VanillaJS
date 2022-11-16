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
    if (typeof this.state.title !== 'string') return;

    const title = this.state.title.length > 0 ? this.state.title : UNTITLED;
    $header.innerHTML = `
      <p class="title">${title}</p>
      <div class="buttons">
        <button class="${DELETE}" type="button">
            <i class="fa-regular fa-trash-can ${DELETE}"></i>
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
