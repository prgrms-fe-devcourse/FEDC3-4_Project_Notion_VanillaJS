import { validateInstance } from "../../utils/validation.js";

export default function SidebarFooter({ $target, onCreateDocument }) {
  validateInstance(new.target);

  const $footer = document.createElement("footer");
  $footer.classList.add("sidebar-footer");

  $target.appendChild($footer);

  this.render = () => {
    $footer.innerHTML = `
      <div class="icon-plus">
        <img src="/src/assets/plus.svg" alt="create new post" />
      </div>
      <span class="title">새 페이지</span>
    `;
  };

  this.render();

  $footer.addEventListener("click", () => {
    onCreateDocument();
  });
}
