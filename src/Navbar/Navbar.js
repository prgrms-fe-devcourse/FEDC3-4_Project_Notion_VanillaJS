import { isNew } from '../utils/errorHandler.js';
import { createElement } from '../utils/dom.js';
import { request } from '../utils/api.js';
import { documentsUrl } from '../utils/util.js';
import DocumentHeader from './DocumentHeader.js';

function Navbar({ target }) {
  isNew(new.target);
  const nav = createElement('nav');
  nav.className = 'sidebar';

  new DocumentHeader({
    target: nav,
    initialState: {
      text: 'Notion',
      button: {
        text: '+',
      },
    },
  });

  this.setState = async () => {
    const posts = await request(`${documentsUrl}`);
    this.render();
  };

  this.render = async () => {
    target.appendChild(nav);
  };
}

export default Navbar;
