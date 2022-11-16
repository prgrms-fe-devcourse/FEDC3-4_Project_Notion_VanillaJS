import { SideBar, DocumentPage } from './pages/index.js';
import LIST_API from './api/documentApi.js';
import { $, removeDocument } from './util/index.js';
import { push } from './router.js';
class App {
    constructor({ $target, initialState }) {
        this.openState = [];
        this.$target = $target; 

        this.sideBar = new SideBar({
            $target: this.$target,
            documents: initialState,
            onClickDocument: this.onClickDocument.bind(this),
            onAddDocument: this.onAddDocument.bind(this),
            onDeleteDocument: this.onDeleteDocument.bind(this),
        });

        this.documentPage = new DocumentPage({
            $target: this.$target,
            onGetOneDocument: this.onGetOneDocument.bind(this),
            onEditDocument: this.onEditDocument.bind(this),
        });
    }

    async onGetAllDocument() {
        return await LIST_API.getAllDocuments();
    } 

    async onGetOneDocument({ docId }) { 
        return await LIST_API.getOneDocument({ id: docId });
    }

    async onClickDocument({ docId }) {
        await LIST_API.getOneDocument({ id: docId });

        if (this.openState.includes(docId)) {
            const idx = this.openState.indexOf(docId);

            this.openState.splice(idx, 1);
        } else {
            this.openState.push(docId);
        }

        push({ nextUrl: `/documents/${docId}` });
    }

    async onAddDocument({ docId }) {
        const doc = await LIST_API.createDocument({ content: { title: "", parent: docId } });
        const docs = await this.onGetAllDocument();

        this.sideBar.setState({ nextState: docs, openState: this.openState });
        push({ nextUrl: `/documents/${doc.id}` });
    }

    async onDeleteDocument({ docId }) { 
        await LIST_API.deleteDocument({ id: docId });
        const docs = await this.onGetAllDocument(); 

        this.sideBar.setState({ nextState: docs, openState: this.openState });
    }

    async onEditDocument({ docId, content }) {
        const doc = await LIST_API.editDocument({ id: docId, content });
        const $doc = $({selector: `[data-index="${docId}"] > span`});

        $doc.innerText = doc.title;
        removeDocument(`document-${docId}`);
    }

    render() {
        this.sideBar.render();
        this.documentPage.render();
    }
}

export default App;
