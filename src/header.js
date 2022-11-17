export default function Header({ $target }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", "header");
  const $header = document.createElement("h2");

  $target.appendChild($div);
  $div.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    Notion`;
  };
  this.render();
}
