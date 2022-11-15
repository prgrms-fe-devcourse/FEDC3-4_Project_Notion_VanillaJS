import Editor from './components/Editor.js';
import NavBar from './components/NavBar.js';
import { fetchDocumentContents, fetchDocumentList } from './utils/api.js';

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
    },
  });

  const editor = new Editor({
    $container,
    initialState: this.state.documentContent,
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
