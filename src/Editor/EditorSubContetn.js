import { createElement } from '../utils/dom.js';

function EditorSubContetn({ div, initialState }) {
    const editorDocuments = createElement('div');
    editorDocuments.className = 'editor-documents';

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    const createSubDocuments = (documents) => {
        console.log(documents);
    };

    this.render = () => {
        // editorDocuments.innerHTML = createSubDocuments(this.state);
        // div.appendChild(editorDocuments);
    };

    this.render();
}

export default EditorSubContetn;
