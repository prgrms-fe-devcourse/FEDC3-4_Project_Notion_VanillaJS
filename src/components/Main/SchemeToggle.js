import { local } from "../../util/storage.js";
import { makeElement } from "../../util/templates.js";

export default function SchemeToggle({ $target }) {
  const $pageHeader = makeElement("div", "toggle-container");
  $target.appendChild($pageHeader);

  this.render = () => {
    $pageHeader.innerHTML = `
      <label for="scheme-toggle">
        <input type="checkbox" id="scheme-toggle">
        <span class="toggle">
          <i class="xi-moon"><span>다크모드 켜기</span></i>
          <i class="xi-brightness"><span>라이트모드 켜기</span></i>
        </span>
      </label>
    `;
  };

  this.render();

  const $toggle = document.getElementById("scheme-toggle");

  const setScheme = () => {
    const storedScheme = local.getItem('scheme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  
    if(storedScheme) document.documentElement.setAttribute('data-scheme', storedScheme);
    
    switch (storedScheme) {
      case 'dark':
        $toggle.checked = true; 
        break;
      case 'true':
      default:
        $toggle.checked = false;
        break;
    }
  }

  setScheme();

  $toggle.addEventListener("change", function () {
    const nextScheme = this.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-scheme", nextScheme);
    local.setItem("scheme", nextScheme);
  });
}
