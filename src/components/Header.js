import { isNew } from "../utils/isNew.js";

export default function Header({ $target, initialState }) {
  isNew(Header, this);
  const $header = document.createElement("h3");
  $header.className = "header";

  this.state = initialState;

  $header.innerHTML = `
  ${this.state}의 Notion
`;

  this.render = () => {
    $target.prepend($header);
  };

  this.render();
}
