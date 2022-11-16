import { validation } from "../../validation.js";

export default function SidebarTitle({ $target, text, onClick }) {
  validation(new.target, "SidebarTitle");
  const $sidebarTitle = document.createElement("header");
  $sidebarTitle.className = "sidebarTitle";
  $target.appendChild($sidebarTitle);

  $sidebarTitle.addEventListener("click", () => {
    onClick();
  });

  this.render = () => {
    $sidebarTitle.textContent = text;
  };

  this.render();
}
