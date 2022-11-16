export default function Header({ $target }) {
  const $header = document.createElement("div");
  
  $header.setAttribute("class", "header");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    <strong>지연</strong> 님의 Notion
    <i class="fa-brands fa-neos"></i>
          `;
  };
  this.render();
}
