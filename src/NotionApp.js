import Editor from './components/Editor.js';
import NavBar from './components/NavBar.js';
import { fetchDocumentContents, fetchDocumentList, request } from './utils/api.js';

export default function NotionApp({ $container }) {
  this.state = {
    documentList: [],
    currentDocumentId: null,
    documentContent: null,
  };

  this.setDocumentList = (newState) => {
    this.state = newState;
    navBar.setState(this.state.documentList);
  };

  this.setDocumentContent = (newState) => {
    this.state = newState;
    editor.setState(this.state.documentContent);
  };

  const navBar = new NavBar({
    $container,
    initialState: this.state.documentList,
    onSelect: (id) => {
      loadDocumentContents(id);
      history.pushState(null, null, `/documents/${id}`);
    },
  });

  const editor = new Editor({
    $container,
    initialState: this.state.documentContent,
    onEdit: async (documentContent) => {
      const { id, title, content } = documentContent;
      const newContent = { title, content };

      this.setDocumentContent({
        ...this.state,
        documentContent,
      });
      // TODO: title 바뀌면, list 반영해야함
      await request(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newContent),
      });
      // 서버와 동기화
      await loadDocumentContents(id);
    },
  });

  const turnOn = async () => {
    const documentList = await fetchDocumentList();
    this.setDocumentList({
      ...this.state,
      documentList,
    });
  };

  const loadDocumentContents = async (documentId) => {
    if (documentId === this.state.currentDocumentId) return;

    const documentContent = await fetchDocumentContents(documentId);
    this.setDocumentContent({
      ...this.state,
      currentDocumentId: documentId,
      documentContent,
    });
  };

  turnOn();
}
