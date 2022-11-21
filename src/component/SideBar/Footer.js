import { $ } from '../../lib/dom.js';

export default function Footer({ $target, addNewDocument, holdListScroll }) {
  const $footer = document.createElement('footer');
  $footer.className = 'sideBar';
  $target.appendChild($footer);

  this.render = () => {
    $footer.innerHTML = `
            <button class="add-root-btn">
            <span class="add-mark">+</span>
            <span class="footer-text">새 페이지</span>
            </button>
      `;
  };

  this.render();
  const $addBtn = $('.add-root-btn');
  $addBtn.addEventListener('click', () => {
    // 루트 도큐먼트 추가하는 경우.
    addNewDocument();
    holdListScroll();
  });
}
