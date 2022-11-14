import DocumentHeader from '../components/DocumentHeader.js';
import DocumentList from '../components/DocumentList.js';
import DocumentFooter from '../components/DocumentFooter.js';
import { request } from '../utils/api.js';

export default function DocumentPage({ $target }) {
  this.state = {
    documents: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState(this.state.documents);
  };

  new DocumentHeader({
    $target,
  });

  const documentList = new DocumentList({
    $target,
    initialState: this.state.documents,
  });

  new DocumentFooter({
    $target,
  });

  const fetchDocument = async () => {
    const documents = await request('/documents');
    this.setState({
      ...this.state,
      documents,
    });
  };

  this.render = async () => {
    await fetchDocument();
  };

  this.render();
}
