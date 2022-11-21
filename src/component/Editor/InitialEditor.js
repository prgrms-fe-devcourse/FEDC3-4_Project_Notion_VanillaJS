export default function InitialEditor({ $target }) {
  const $image = document.createElement('img');
  $image.setAttribute('src', '/src/assets/img/DongTion.png');
  $image.className = 'main-img';

  this.removeMainEditor = () => {
    if ([...$target.childNodes].includes($image)) {
      $target.removeChild($image);
    }
  };

  this.render = () => {
    $target.appendChild($image);
  };
}
