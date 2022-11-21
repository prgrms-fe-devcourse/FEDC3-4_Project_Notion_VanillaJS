import { push } from '../utils/router.js';

export default function Header({ $target }) {
  const $header = document.createElement('div');
  $header.className = 'header';
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    <div>
        <h1>퉁이리의 Notion</h1>
    </div>
    `;
  };

  this.render();

  $header.addEventListener('click', (e) => {
    const { className } = e.target;
    if (className === 'notion-title') {
      push('/');
    }
  });
}
