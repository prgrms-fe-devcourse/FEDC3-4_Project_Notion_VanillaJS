import { makeElement } from "../../util/templates.js";

export default function DocEditHeader({ $target, onToggle }) {
  const $pageHeader = makeElement('div', 'doc-edit-header');
  $target.appendChild($pageHeader)

  this.render = () => {
    $pageHeader.innerHTML = `
      <label for="theme-toggle">
        <input type="checkbox" id="theme-toggle">
        <span class="toggle">
          <i class="xi-moon"><span>다크모드 켜기</span></i>
          <i class="xi-brightness"><span>라이트모드 켜기</span></i>
        </span>
      </label>
    `
  }

  this.render();


}

/**
 * add toggle event
 */