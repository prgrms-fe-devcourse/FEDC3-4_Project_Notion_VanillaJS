import { $ } from '../../lib/utils.js';

export default function Footer({ $target, addNewDocument, holdListScroll }) {
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
    //footer 낙관적 업데이트 안해줬었네 ㅋㅋ 어케된거지 지금까지
    // 이거는 루트 도큐먼트 추가하는 경우.
    addNewDocument();
    holdListScroll();
  });
}
