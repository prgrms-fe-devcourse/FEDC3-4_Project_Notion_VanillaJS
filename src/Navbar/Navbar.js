import { isNew } from '../utils/errorHandler.js';
import { createElement } from '../utils/dom.js';
import { request } from '../utils/api.js';
import { documentsUrl } from '../utils/util.js';
import DocumentHeader from './DocumentHeader.js';
import DocumentList from './DocumentList.js';
import { addMethod, deleteMethod } from '../utils/optionsMethod.js';
import { route } from '../utils/route.js';

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

    const documentList = new DocumentList({
        target: nav,
        initialState: [],
        onDelete: async (id) => {
            // 현재 Document 삭제하게 되면 하위 Documents 전부 삭제
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
            const handlerDelete = async () => {
                const currentDocument = findCurrentId();
                const que = [currentDocument];
                const queId = [currentDocument.id];
                const current = que.shift();

                while (que.length > 0) {
                    current.documents.forEach((el) => {
                        que.push(el);
                        queId.push(el.id);
                    });
                }

                for (let i of queId) {
                    await deleteMethod(i);
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
