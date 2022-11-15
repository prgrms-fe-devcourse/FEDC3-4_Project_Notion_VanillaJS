export default function Blank({ $target, initialState }) {
  const $blank = document.createElement('div');
  $blank.classList.add('home-page');

  this.state = initialState;

  $blank.innerHTML = this.state;

  this.render = () => {
    $target.appendChild($blank);
  };

  this.empty = () => {
    $target.removeChild($blank);
  };
}
