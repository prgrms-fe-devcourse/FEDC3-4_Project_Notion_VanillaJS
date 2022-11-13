import { makeElement, makeButton } from "../../util/templates.js";

export default function Header({ $target, content = {
  title: '',
  subtitle: ''
}}) {
  const $header = makeElement('div', 'doc-list-header');
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <header>
        <h1>${content.title}</h1>
        <p>${content.subtitle}</p>
      </header>
    `
    $header.appendChild(makeButton('menu', 'xi-bars', '메뉴 열기/닫기'))
  }

  this.render();
}