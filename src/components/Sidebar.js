import Header from './Header.js';
import DocumentList from './DocumentList.js';
import Footer from './Footer.js';
import { request } from '../utils/api.js';
import { push } from '../utils/router.js'

export default function Sidebar({
  $target,
  initialState
}){
  const $sidebar = document.createElement('section');
  $sidebar.className = 'sidebar';
  
  this.state = initialState;

  this.setState = async () => {
    this.state = await request('/documents');
    // console.log(this.state);
    documentList.setState(this.state);
    this.render();
  }

  new Header({
    $target: $sidebar
  })
  
  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
    onSelect: (id) => {
      push(`/documents/${id}`);
    },
    onCreateDocument: async (parentId) => {
      const document = {
        title: '',
        parent: parentId,
      };
      const newDocument = await createDocument(document);
      push(`/documents/${newDocument.id}`)
    },
    onRemoveDocument: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE'
      });
      push('/')
    }
  })

  new Footer({
    $target: $sidebar,
    onCreateRootDocument: async () => {
      const document = {
        title: '',
        parent: null,
      };
      const newDocument = await createDocument(document);
  
      push(`/documents/${newDocument.id}`)
    }
  });
  
  this.render = async () => {
    $target.appendChild($sidebar);
  };

  // const getDocumentList = async() => {
  //   const list = await request('/documents');
  //   documentList.setState(list);
  // };

  const createDocument = async (document) => {
    const newDocument =  await request('/documents', {
      method: 'POST',
      body: JSON.stringify(document),
    });
    return newDocument;
  };
}