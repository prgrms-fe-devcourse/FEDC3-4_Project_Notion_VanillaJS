import { $, createElement } from '../utils/dom.js';
import { isString } from '../utils/errorHandler.js';

function PostTitle({ div, initialState, onChangeTitle }) {
    const editorTitle = createElement('div');
    this.state = initialState;

    div.appendChild(editorTitle);

    this.setState = nextState => {
        this.state = nextState;
        // null 나오는게 맞음 헤더 버튼 눌렀을 때
        const { title } = this.state;
        let el = $('.title');
        // null 나오는게 맞음 헤더 버튼 눌렀을 때
        this.render();
        editorTitle.querySelector('.title').value = title && title;
    };

    this.render = () => {
        const { title } = this.state;
        editorTitle.innerHTML = `<input type="text" name="title" class="title" placeholder="제목 없음" value="${title}"/>`;
        div.appendChild(editorTitle);
    };

    const onKeyupEditorTitle = () => {
        editorTitle.addEventListener('keyup', e => {
            const { name } = e.target;
            const titleValue = e.target.value;

            isString(titleValue);

            const nextState = {
                ...this.state,
                [name]: titleValue,
            };

            onChangeTitle(nextState);
        });
    };
    this.render();
    onKeyupEditorTitle();
}

export default PostTitle;
