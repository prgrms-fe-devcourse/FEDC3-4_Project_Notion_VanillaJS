import { $ } from '../../lib/utils.js';

export default function Footer({ $target, addRootDocument, holdListScroll }) {
  const $footer = document.createElement('footer');
  $footer.className = 'sideBar';
  $target.appendChild($footer);

  this.render = () => {
    $footer.innerHTML = `
            <button class="add-root-btn">
            + 
            <span class="footer-text">새 페이지</span>
            </button>
      `;
  };

  this.render();
  const $addBtn = $('.add-root-btn');
  $addBtn.addEventListener('click', () => {
    console.log($('.modal-container'));
    addRootDocument();
    holdListScroll();
  });
}
