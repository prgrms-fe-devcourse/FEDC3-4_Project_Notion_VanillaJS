import { validation, checkDifference } from "../../validation.js";

export default function BreadCrumb({ $target, initialState, clickPath }) {
  validation(new.target, "BreadCrumb");

  const $breadCrumb = document.createElement("nav");
  $breadCrumb.className = "linkContainer";
  this.state = initialState;

  this.setState = (nextState) => {
    if (typeof nextState !== "object") throw new Error("변경될 상태가 객체가 아닙니다.");
    if (checkDifference(this.state, nextState)) return;
    this.state = nextState;
    this.render();
  };

  const recursiveBC = (id, path) => {
    const $curLi = document.getElementById(id);
    if ($curLi) {
      const $ul = $curLi.closest("ul");

      if ($ul.className === "child") {
        path.push([$curLi.querySelector("span").innerHTML, id]);

        recursiveBC($ul.closest("li").id, path);
      } else {
        path.push([$curLi.querySelector("span").innerHTML, id]);
      }
    }
  };

  const renderBreadCrumb = (id) => {
    const path = [];

    recursiveBC(id, path);

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
        ${docId ? renderBreadCrumb(docId) : ""}
      </div>
    `;
  };

  $target.prepend($breadCrumb);
}
