import { createElement, targetClosest } from '../utils/dom.js';

function EditorSubContent({ div, initialState, onClickSubDocument }) {
    const editorDocuments = createElement('div');
    editorDocuments.className = 'editor-sub-document';

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        div.appendChild(editorDocuments);

        const { documents } = this.state;
        editorDocuments.innerHTML = paintSubDocuments(documents);
    };

    const paintSubDocuments = (documents2) => {
        if (documents2 === undefined) {
            return false;
        } else {
            return documents2
                .map(
                    ({ id, title }) => `
   
                    <div id="${id}">
                       <i class="far fa-file"></i>
                    <span>${title}</span></div>
            `,
                )
                .join('');
        }
    };

    editorDocuments.addEventListener('click', (e) => {
        const subPostId = targetClosest(e, 'div').id;
        onClickSubDocument(subPostId);
    });
    this.render();
}

export default EditorSubContent;
