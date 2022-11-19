import { validateInstance } from "../../utils/validation.js";

export default function SidebarHeader({ $target }) {
  validateInstance(new.target);

  const $header = document.createElement("header");
  $header.classList.add("sidebar-header");

  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <div>
        <span class="emoji">📒</span>은지의 <strong>Notion</strong>
      </div>
      <button class="close-button" title="사이드바 닫기">
        <img src="/src/assets/double-arrow.svg"/>
      </button>
      `;
  };

  const closeSidebar = (e) => {
    const $closeButton = e.target.closest(".close-button");

    if ($closeButton) {
      const $sidebar = document.querySelector(".sidebar");
      const $document = document.querySelector(".document");

      $sidebar.classList.add("slide");
      $document.classList.add("expend");
    }
  };

  const init = () => {
    this.render();

    $header.addEventListener("click", closeSidebar);
  };

  init();
}
