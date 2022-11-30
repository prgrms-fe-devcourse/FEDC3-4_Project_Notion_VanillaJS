import { createElement, targetClosest } from '../utils/dom.js';
import { isNew } from '../utils/errorHandler.js';
import { route } from '../utils/route.js';
import { documentsUrl } from '../utils/util.js';
import { addHeaderMethod } from '../utils/optionsMethod.js';

function NavbarHeader({ target, initialState }) {
  isNew(new.target);

  const header = createElement('div');
  header.className = 'header';
  this.state = initialState;

  const render = () => {
    header.innerHTML = `
                      <span>${this.state.text}</span>
                      <button class="home-plus-btn"><i class="far fa-plus-square"></i></button>
                      <button class="home-btn"><i class="fa-sharp fa-solid fa-house"></i></button>
                  `;
    target.appendChild(header);
  };

  const onClickHeader = () => {
    header.addEventListener('click', async (e) => {
      const homeBtn = targetClosest(e, '.home-btn');
      if (homeBtn) {
        route('/');
      } else {
        const createPost = await addHeaderMethod(documentsUrl);
        route(`${documentsUrl}/${createPost.id}`);
      }
    });
  };
  render();
  onClickHeader();
}

export default NavbarHeader;
