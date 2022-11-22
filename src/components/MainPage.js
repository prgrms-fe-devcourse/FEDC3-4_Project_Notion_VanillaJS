import { isNew } from "../utils/isNew.js";
import { clickRootAdd } from "../utils/event.js";

export default function MainPage({ $target, initialState }) {
  isNew(MainPage, this);
  const $mainPage = document.createElement("div");
  $mainPage.className = "main-page";

  this.state = initialState;

  $mainPage.innerHTML = `
    <div class="main-page-container">
      <p>${this.state}님의 페이지 입니다.</p>
      <p><strong style="cursor: pointer"><u>페이지를 추가</u></strong>하여 글을 작성하세요</p>
    </div>
  `;
  this.render = () => {
    $target.appendChild($mainPage);
  };

  $mainPage.addEventListener("click", (e) => {
    const { target } = e;
    const $strong = target.closest("strong");
    if ($strong) {
      clickRootAdd();
    }
  });
}
