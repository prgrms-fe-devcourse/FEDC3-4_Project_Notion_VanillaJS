import { ADD_DOCUMENT_BUTTON, DOCUMENT_HEADER } from '../util/constants.js';


export default function Sidebar({ $target, onClickHeader, onClickAddButton }) {
  const $element = document.createElement('div');
  $element.className = 'sidebar';
  $element.innerHTML = `<div class="${DOCUMENT_HEADER}"><h1>My Documents</h1><span class="icon ${ADD_DOCUMENT_BUTTON}"></span></div>`;

  $target.appendChild($element);

  $element.addEventListener('click', async (e) => {
    if (e.target.tagName === 'H1') {
      onClickHeader();
    } else if (e.target.className.includes(ADD_DOCUMENT_BUTTON)) {
      onClickAddButton();
    }
  });

  this.getElement = () => $element;
}