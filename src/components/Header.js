function Header({ $target }) {
  const $title = document.createElement("div");
  $title.className = "header-title";
  $target.appendChild($title);

  this.render = () => {
    $title.innerHTML = "<h1>YENOTION</h1>";
  };

  this.render();
}

export default Header;
