import { isConstructor } from "../../Helpers/isConstructor.js";

export default function Header({ $target, text }) {
  isConstructor(new.target);
  const $header = document.createElement("h1");
  $header.textContent = text;
  $target.appendChild($header);
}
