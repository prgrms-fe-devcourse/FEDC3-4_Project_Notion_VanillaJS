import DocumentList from "./DocumentList.js";
import DocumentEdit from "./DocumentEdit.js";
import { request } from "../util/api.js";

export default function App({ $app }) {

  this.state = {
    documents: [],
    selectedDocuments: null
  }

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState(this.state.documents);
    documentEdit.setState(this.state.selectedDocuments);
  }

  const documentList = new DocumentList({
    $target: $app,
    initialState: this.state.documents,
    onDocumentClick: async (id) => {
      const selectedDocuments = await request(`/documents/${id}`)
      this.setState({ ...this.state, selectedDocuments });
    }
  });

  const documentEdit = new DocumentEdit({
    $target: $app,
    initialState: this.state.selectedDocuments
  });

  const getDocuments = async () => {
    const documents = await request('/documents');
    this.setState({ ...this.state, documents });
  }

  getDocuments();
}