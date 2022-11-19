import { validateInstance } from "../../utils/validation.js";

export default function DocumentHeader({ $target }) {
  validateInstance(new.target);

  const $documentHeader = document.createElement("div");
  $documentHeader.classList.add("document-header");

  $target.appendChild($documentHeader);

  this.render = () => {
    $documentHeader.innerHTML = `
      <button class="open-button" title="사이드바 열기">
        <img src="/src/assets/menu.svg"/>
      </button>
    `;
  };

  const openSidebar = (e) => {
    const $openButton = e.target.closest(".open-button");

    if ($openButton) {
      const $sidebar = document.querySelector(".sidebar");
      const $document = document.querySelector(".document");

      $sidebar.classList.remove("slide");
      $document.classList.remove("expend");
    }
  };

  const init = () => {
    this.render();

    $documentHeader.addEventListener("click", openSidebar);
  };

  init();
}
