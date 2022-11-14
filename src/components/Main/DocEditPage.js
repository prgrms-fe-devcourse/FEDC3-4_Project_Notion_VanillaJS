import Editor from "./Editor.js";
import DocEditHeader from "./DocEditHeader.js";
import { makeElement } from "../../util/templates.js";

export default function DocEditPage({ $target }) {
  const $page = makeElement('main', 'doc-edit-page');
  const $pageContainer = makeElement('div', 'main-container');
  const $pageFooter = makeElement('footer', 'footer');

  new DocEditHeader({
    $target: $page
  })
  const editor = new Editor({
    $target: $page,
    initialState: []
  })

  this.init = () => {
    $pageFooter.innerHTML = `<p>Made by Meeeee</p>`
    $page.appendChild($pageFooter);
    $pageContainer.appendChild($page);
    $target.appendChild($pageContainer);
  }

  this.init();

}