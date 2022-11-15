import { ADD } from '../utils/constants.js';

export default function DocumentAddButton({ $target, initialState, onClick }) {
  const $button = document.createElement('div');

  $target.appendChild($button);

  this.state = initialState;

  $button.className = `document-add-button ${this.state.position}`;

  this.render = () => {
    $button.innerHTML = `
      <button type="button">
        <i class="fa-solid fa-plus ${ADD}"></i>
      </button>
      <p>${this.state.text}</p>
    `;
  };

  $button.addEventListener('click', () => {
    onClick();
  });

  this.render();
}
