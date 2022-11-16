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
      <button class="menu-button" title="사이드바 닫기">
        <img src="/src/assets/double-arrow.svg"/>
      </button>
      `;
  };

  this.render();

  $header.addEventListener("click", (e) => {
    const $button = e.target.closest("button");

    if ($button) {
      const $sidebar = document.querySelector(".sidebar");
      const $postEditPage = document.querySelector(".post-edit-page");

      $sidebar.classList.add("slide");
      $postEditPage.classList.add("expend");
    }
  });
}
