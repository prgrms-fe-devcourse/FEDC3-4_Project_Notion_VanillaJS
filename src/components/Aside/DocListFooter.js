import { makeButton, makeElement } from "../../util/templates.js";

export default function DocListFooter({ $target, onAddRoot }) {
  const $footer = makeElement("footer", "doc-list-footer");
  $target.appendChild($footer);

  const $button = makeButton({
    name: "add-root", 
    iconName: "xi-plus",
    textContent: 'Add New Root'
  });
  
  $footer.appendChild($button);

  $button.addEventListener("click", (e) => {
    onAddRoot()
  });
}
