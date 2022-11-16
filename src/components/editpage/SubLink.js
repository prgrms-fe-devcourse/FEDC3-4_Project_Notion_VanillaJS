import { validation } from "../../validation.js";
export default function SubLink({ $target, initialState, clickLink }) {
  validation(new.target, "SubLink");

  const $subLink = document.createElement("footer");
  $subLink.className = "linkContainer";
  $target.appendChild($subLink);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { doc } = this.state;

    if (doc.documents.length > 0) {
      $subLink.innerHTML = doc.documents
        .map((el) => `<div class="link" data-id=${el.id}>${el.title}</div>`)
        .join("");
    } else {
      $subLink.innerHTML = `
        `;
    }
  };

  $subLink.addEventListener("click", (e) => {
    const { id } = e.target.closest("div").dataset;
    const $curLi = document.getElementById(id);
    const $parentUl = $curLi.closest("ul");

    $parentUl.closest("li").querySelector(".toggleFold").innerText = "▼";
    $parentUl.style.display = "block";
    clickLink(id);
  });
}
