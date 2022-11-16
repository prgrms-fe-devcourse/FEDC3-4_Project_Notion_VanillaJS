import { push } from '../utils/router.js';

export default function Header({
  $target
}){
  const $header = document.createElement('div');
  $header.className = 'header';
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <img class="header-logo" src='../assets/Notion_app_logo.png'>
      <h1>Nation</h1>
    `
  }

  this.render();

  $header.addEventListener('click', () => {
    push('/');
  })
}