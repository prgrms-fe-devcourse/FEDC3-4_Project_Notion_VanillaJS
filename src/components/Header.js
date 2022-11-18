export default function Header({ $target }) {
  const $header = document.createElement("div");
  $header.classList.add("header");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <img src="../assets/images/cat.png"> 
      <div>
        <p>이혜준의 <b>Notion</b></p>
        <p>solar3070@gmail.com</p>
      </div>
    `;
  };

  this.render();
}
