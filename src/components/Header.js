import { push } from "../utils/router.js";

export default function Header({ $target }) {
  const $header = document.createElement("div");
  $header.classList.add("header");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <img src="../assets/images/cat.png"> 
      <div>
        <p class="notion-title">이혜준의 <b>Notion</b></p>
        <p>solar3070@gmail.com</p>
      </div>
    `;
  };

  this.render();

  $header.addEventListener("click", (e) => {
    const { className } = e.target;
    if (className === "notion-title") {
      push("/");
    }
  });
}
