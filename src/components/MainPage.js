export default function MainPage({ $target, initialState }) {
  const $mainPage = document.createElement("div");
  $mainPage.className = "main-page";

  this.state = initialState;

  $mainPage.innerHTML = `
    <div class="main-page-container">
      <p>${this.state}님의 페이지 입니다.</p>
      <p><strong><u>페이지를 추가</u></strong>하여 글을 작성하세요</p>
    </div>
  `;
  this.render = () => {
    $target.appendChild($mainPage);
  };
}
