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

    const paintSubDocuments = (documents) => {
        if (documents === undefined) {
            return false;
        } else {
            return documents
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

    const onClickEditorSubDocument = () => {
        editorDocuments.addEventListener('click', (e) => {
            const subPostId = targetClosest(e, 'div').id;
            onClickSubDocument(subPostId);
        });
    };

    this.render();
    onClickEditorSubDocument();
}

export default EditorSubContent;
