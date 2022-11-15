import { push } from '../utils/router.js';

export default function Header({
  $target
}){
  const $header = document.createElement('div');
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <h1>Nation</h1>
    `
  }

  this.render();

  $header.addEventListener('click', () => {
    push('/');
  })
}