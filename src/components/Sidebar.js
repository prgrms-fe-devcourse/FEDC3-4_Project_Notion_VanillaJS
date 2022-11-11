import DocumentList from './DocumentList.js';

import { request } from '../utils/api.js';
import { ROUTE_DOCUMENTS } from '../utils/contants.js';
import { isNew } from '../utils/helper.js';

export default function Sidebar({ $target }) {
  isNew(new.target);

  const $sidebar = document.createElement('div');
  $sidebar.className = 'sidebar';

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
  });

  this.render = async () => {
    const documents = await request(ROUTE_DOCUMENTS);
    documentList.setState(documents);
  };

  this.render();
}
