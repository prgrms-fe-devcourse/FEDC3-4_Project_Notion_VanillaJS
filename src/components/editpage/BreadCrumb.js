import { validation } from "../../validation.js";

export default function BreadCrumb({ $target, initialState, clickPath }) {
  validation(new.target, "BreadCrumb");

  const $breadCrumb = document.createElement("nav");
  $breadCrumb.className = "linkContainer";
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    $target.prepend($breadCrumb);
  };

  this.renderBreadCrumb = (id) => {
    const path = [];

    const recursiveBC = (id) => {
      const $curLi = document.getElementById(id);
      const $ul = $curLi.closest("ul");

      if ($ul.className === "child") {
        path.push([$curLi.querySelector("span").innerHTML, id]);

        recursiveBC($ul.closest("li").id);
      } else {
        path.push([$curLi.querySelector("span").innerHTML, id]);
      }
    };

    recursiveBC(id);

    return path
      .reverse()
      .map((el) => `<span class="link" data-id=${el[1]} >${el[0]}</span>`)
      .join(" / ");
  };

  $breadCrumb.addEventListener("click", (e) => {
    const $span = e.target.closest("span");

    if ($span) {
      const { id } = $span.dataset;
      clickPath(id);
    }
  });

  this.render = () => {
    const { docId } = this.state;

    $breadCrumb.innerHTML = `
      <div>
        ${docId ? this.renderBreadCrumb(docId) : ""}
      </div>
    `;
  };
}
