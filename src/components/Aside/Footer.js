import { makeButton, makeElement } from "../../util/templates.js";

export default function Footer({ $target, onAddRoot }) {
  const $footer = makeElement("footer", "doc-list-footer");
  $target.appendChild($footer);

  const $button = makeButton("add-root", "xi-plus");
  $button.textContent = "Add New Root";
  $footer.appendChild($button);

  $button.addEventListener("click", (e) => {
    onAddRoot()
  });
}
