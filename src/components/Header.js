function Header({ $target }) {
  const $title = document.createElement("div");
  $title.className = "header-title";
  $target.appendChild($title);

  this.render = () => {
    $title.innerHTML = `
      <img src="https://i.ibb.co/Gk8CPyb/notion.png" alt="yenotion-logo">
      <h1>YENOTION</h1>
    `;
  };

  this.render();
}

export default Header;
