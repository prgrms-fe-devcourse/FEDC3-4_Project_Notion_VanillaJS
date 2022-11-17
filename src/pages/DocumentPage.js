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
      console.log('onCreate');
    },
    onScroll: () => {
      // 문제 있음 - onCreate가 실행된 이후에 실행시켜야함
      const $div = $target.querySelector('.document-list');
      $div.scrollTo({ top: $div.scrollHeight, behavior: 'smooth' });
      console.log('onScroll');
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
