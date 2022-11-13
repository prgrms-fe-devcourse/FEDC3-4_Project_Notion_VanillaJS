import Editor from "./Editor.js";
import { makeElement } from "../../util/templates.js";

export default function DocEditPage({ $target }) {
  const $page = makeElement('main', 'doc-edit-page');
  const $pageContainer = makeElement('div', 'main-container');
  const $pageHeader = makeElement('div', 'doc-edit-header');
  const $pageFooter = makeElement('footer', 'footer');

  const editor = new Editor({
    $target: $page,
    initialState: []
  })

  this.init = () => {
    $pageHeader.innerHTML = `
      <label for="theme-toggle">
        <input type="checkbox" id="theme-toggle">
        <span class="toggle">
          <i class="xi-moon"><span>다크모드 켜기</span></i>
          <i class="xi-brightness"><span>라이트모드 켜기</span></i>
        </span>
      </label>
    `
    $pageFooter.innerHTML = `<p>Made by Meeeee</p>`


    $page.appendChild($pageHeader);
    editor.init();
    $page.appendChild($pageFooter);
    $pageContainer.appendChild($page);
    $target.appendChild($pageContainer);
  }

  this.init();

}