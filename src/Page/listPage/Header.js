import { push } from "../../utils/router.js";

export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");
  $header.classList.add("header");
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    const { user, email } = this.state;
    $header.innerHTML = `
        <img class="logo" src="../icon/notion-logo.svg" />
        <div class="user">
          <h3> ${user}의 notion</h3>
          <h5>${email}</h5>
        </div>
        `;
  };

  this.render();

  $header.addEventListener("click", (e) => {
    const $user = e.target.closest(".header");

    if ($user) {
      push("/");
    }
  });
}
