import Editor from "./Editor.js";
import { makeElement } from "../../util/templates.js";

export default function DocEditPage({ $target }) {
  const $page = makeElement('div', 'doc-edit-page')
  $target.appendChild($page)
  
  const editor = new Editor({
    $target: $page,
    initialState: []
  })
}