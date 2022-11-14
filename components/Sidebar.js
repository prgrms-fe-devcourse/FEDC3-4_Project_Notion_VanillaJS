import { ADD_DOCUMENT_BUTTON, DOCUMENT_HEADER } from '../util/constants.js';


export default function Sidebar({ $target, onClickHeader, onClickAddButton }) {
  const $element = document.createElement('div');
  $element.className = 'sidebar';
  $element.innerHTML = `<div class="${DOCUMENT_HEADER}">My Documents<button class="${ADD_DOCUMENT_BUTTON}" type="button">+</button></div>`;

  $target.appendChild($element);

  $element.addEventListener('click', async (e) => {
    if (e.target.className === DOCUMENT_HEADER) {
      onClickHeader();
    } else if (e.target.className === ADD_DOCUMENT_BUTTON) {
      onClickAddButton();
    }
  });

  this.getElement = () => $element;
}