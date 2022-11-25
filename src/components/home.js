export default function Home({ $target, initialState }) {
  const $home = document.createElement('div');
  $home.classList.add('home-page');

  this.state = initialState;

  $home.innerHTML = this.state;

  this.render = () => {
    $target.appendChild($home);
  };

  this.remove = () => {
    if ($target.querySelector('.home-page')) {
      $target.removeChild($home);
    }
  };
}
