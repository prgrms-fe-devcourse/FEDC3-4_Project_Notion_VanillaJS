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
    onCreate: async () => {
      const newDocument = {
        title: '제목 없음',
        parent: null,
      };
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify(newDocument),
      });
      await fetchDocument();
    },
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
