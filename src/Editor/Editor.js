import { createElement } from '../utils/dom.js';
import { isNew, isObject } from '../utils/errorHandler.js';
import { request } from '../utils/api.js';
import { putContentMethod, putTitleMethod } from '../utils/optionsMethod.js';
import EditorTitle from './EditorTitle.js';
import EditorContent from './EditorContent.js';
import { documentsUrl } from '../utils/util.js';
import { route } from '../utils/route.js';
import EditorSubContent from './EditorSubContent.js';

function Editor({ target, initialState }) {
    isNew(new.target);
    const page = createElement('section');
    page.className = 'content';

    const editor = createElement('div');
    editor.className = 'editor';

    this.state = initialState;
    const postTitle = new EditorTitle({
        div: editor,
        initialState: initialState,

        onChangeTitle: async ({ id, title }) => {
            setTimeout(await putTitleMethod(id, title), 2000);
        },
    });

    const postContent = new EditorContent({
        div: editor,
        initialState: initialState,

        onChangeContent: async ({ id, content }) => {
            setTimeout(await putContentMethod(id, content), 2000);
        },
    });

    const postSub = new EditorSubContent({
        div: editor,
        initialState: initialState,
        onClickSubDocument: async (id) => {
            await changeUrl(id);
        },
    });

    this.setState = async (nextState) => {
        const post = await request(`${documentsUrl}/${nextState.postId}`);
        isObject(post);
        postTitle.setState(post);
        postContent.setState(post);
        postSub.setState(post);
        this.render();
    };

    this.render = () => {
        page.appendChild(editor);
        target.appendChild(page);
    };

    const changeUrl = async (id) => {
        try {
            const post = await request(`${documentsUrl}/${id}`);
            route(`${documentsUrl}/${post.id}`);
            console.log(post);
        } catch (e) {
            alert('해당 문서를 찾을 수 없습니다');
            route('/');
        }
    };

    this.render();
}

export default Editor;
