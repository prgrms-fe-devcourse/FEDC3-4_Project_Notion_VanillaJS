import { createElement } from '../../utils/helpers/createElement.js';
import { historyPush } from '../../utils/helpers/router.js';

export default function Header({ $target, initialState }) {
  const $header = createElement({
    element: 'header',
    $target,
    content: initialState || '',
  });
  if ($target.tagName === 'NAV') $header.classList.add('sidebar-header');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $header.innerHTML = `
			${this.state}
		`;
  };

  this.init = () => {
    if ($target.tagName === 'NAV') {
      $header.addEventListener('click', () => {
        historyPush('/');
      });
    }
  };

  this.init();
}
