import { isNew } from '../utils/errorHandler.js';
import { createElement } from '../utils/dom.js';
import { request } from '../utils/api.js';
import { documentsUrl } from '../utils/util.js';
import { addMethod, deleteMethod } from '../utils/optionsMethod.js';
import { route } from '../utils/route.js';
import NavbarDocumentList from './NavbarDocumentList.js';
import NavbarHeader from './NavbarHeader.js';

function Navbar({ target }) {
    isNew(new.target);
    const nav = createElement('nav');
    nav.className = 'sidebar';

    new NavbarHeader({
        target: nav,
        initialState: {
            text: 'Notion',
        },
    });

    const documentList = new NavbarDocumentList({
        target: nav,
        initialState: [],
        onDelete: async (id) => {
            const findCurrentId = () => {
                const rootDocument = [...documentList.state];

                while (rootDocument.length > 0) {
                    const cur = rootDocument.shift();

                    if (parseInt(cur.id) === parseInt(id)) {
                        console.log(cur);
                        return cur;
                    }

                    cur.documents.forEach((el) => {
                        rootDocument.push(el);
                    });
                }
            };
            // 현재 하위 document 가 3개 이상이면 하위 document 값이 삭제가 안되고 있음
            // 하위 document 2개씩만 삭제되는 현상

            const handlerDelete = async () => {
                const currentDocument = findCurrentId();

                let que = [currentDocument];

                const queId = [currentDocument.id];

                while (que.length > 0) {
                    const current = que.shift();
                    current.documents.forEach((el) => {
                        que.push(el);
                        queId.push(el.id);
                    });

                    for (let i of queId) {
                        await deleteMethod(i);
                        que = [];
                    }
                }
            };

            await handlerDelete();
            route('/');
        },

        onAdd: async (id) => {
            const newPost = await addMethod(id);
            route(`${documentsUrl}/${newPost.id}`);
        },
    });

    this.setState = async () => {
        const posts = await request(`${documentsUrl}`);
        documentList.setState(posts);
        this.render();
    };

    this.render = async () => {
        target.appendChild(nav);
    };
}

export default Navbar;
