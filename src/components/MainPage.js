export default function MainPage({ $target }) {
  const $mainPage = document.createElement("div");
  $mainPage.className = "main-page";

  $mainPage.innerHTML = `
    여기는 메인 페이지
  `;
  this.render = () => {
    $target.appendChild($mainPage);
  };
}
