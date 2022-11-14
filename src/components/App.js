import Sidebar from './Sidebar.js';
import DocumentEditPage from './DocumentEditPage.js';

import { ROUTE_DOCUMENTS } from '../utils/constants.js';
import { isNew } from '../utils/helper.js';
import { initRouter } from '../utils/router.js';

export default function App({ $target }) {
  isNew(new.target);

  new Sidebar({
    $target,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: '',
        content: '',
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname.indexOf(ROUTE_DOCUMENTS) === 0) {
      const [, , documentId] = pathname.split('/');
      documentEditPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
