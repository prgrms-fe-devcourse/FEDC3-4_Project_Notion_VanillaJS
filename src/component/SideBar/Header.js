import { push } from '../../lib/router.js';

// state => username
export default function Header({ $target, initialState }) {
  const $header = document.createElement('header');
  $header.className = 'sideBar';
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    $header.innerHTML = `
    <div class="header-content">
      <span>😁 ${this.state.username}의 노션</span>
    </div>
  `;
  };

  this.render();

  $header.addEventListener('click', () => {
    push('/');
  });
}
