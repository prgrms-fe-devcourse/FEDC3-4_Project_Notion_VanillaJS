import { validateInstance } from "../../utils/validation.js";

export default function PostPageHeader({ $target }) {
  validateInstance(new.target);

  const $postPageHeader = document.createElement("div");
  $postPageHeader.classList.add("post-edit-page-header");

  $target.appendChild($postPageHeader);

  this.render = () => {
    $postPageHeader.innerHTML = `
      <button class="open-button" title="사이드바 열기">
        <img src="/src/assets/menu.svg"/>
      </button>
    `;
  };

  const openSidebar = (e) => {
    const $openButton = e.target.closest(".open-button");

    if ($openButton) {
      const $sidebar = document.querySelector(".sidebar");
      const $postPage = document.querySelector(".post-edit-page");

      $sidebar.classList.remove("slide");
      $postPage.classList.remove("expend");
    }
  };

  const init = () => {
    this.render();

    $postPageHeader.addEventListener("click", openSidebar);
  };

  init();
}
