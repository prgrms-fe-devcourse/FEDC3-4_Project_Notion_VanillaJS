import DocList from "./DocList.js";
import { getDocument, createDocument, deleteDocument } from "./api.js";

export default function DocListPage({ $target, initialState }) {
  const $page = document.createElement('div');
  $target.appendChild($page)

  this.state = initialState;

  const docList = new DocList({
    $target: $page,
    initialState: [],
    onSelect: (documentId) => {
      
    },
    onAdd: async (parentId) => {
      const newDoc = await createDocument({
        'title': '',
        'parent': parentId
      })
      console.log(newDoc)
      this.setState()
    },
    onRemove: async (documentId) => {
      const deleted = await deleteDocument(documentId)
      console.log(deleted)
      this.setState()
    }
  })






  this.setState = async () => {
    const rootDocs = await getDocument()
    docList.setState(rootDocs)
  }

  // docList.setState(DUMMY_DATA)

  this.setState()
}