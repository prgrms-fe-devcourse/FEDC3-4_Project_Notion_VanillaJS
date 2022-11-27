import { push } from "../util/router.js";

export default function Header({ $target, $name }) {
  const $header = document.createElement("header");
  $header.style.cursor = "pointer";

  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      📌&nbsp<span class="title">${$name}</span>&nbsp의 Notion
    `;
  };

  $header.addEventListener("click", (e) => {
    push("/");
  });

  this.render();
}
