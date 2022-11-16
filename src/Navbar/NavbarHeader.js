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

    this.render = () => {
        header.innerHTML = `
            <span>${this.state.text}</span>
            <button>${this.state.button.text}</button>
            <button class="home-btn"><i class="fa-sharp fa-solid fa-house"></i></button>
        `;
        target.appendChild(header);
    };

    // 해당 제목클릭 했을때 page 이동
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
    this.render();

    onClickHeader();
}

export default NavbarHeader;
