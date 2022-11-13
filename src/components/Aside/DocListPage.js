import Header from "./Header.js";
import DocList from "./DocList.js";
import Footer from "./Footer.js";
import { getDocument, createDocument, deleteDocument } from "../api.js";
import { push } from "../router.js";
import { makeElement } from "../../util/templates.js";

export default function DocListPage({ $target, initialState }) {
  const $page = makeElement('aside', 'doc-list-page', 'on')
  $target.appendChild($page)

  this.state = initialState;

  new Header({
    $target: $page,
    content: {
      title: 'Vanilla Notion 🍦',
      subtitle: 'Simple Notetaking App'
    }
  })

  const docList = new DocList({
    $target: $page,
    initialState: [],
    onSelect: (documentId) => {
      // change route
    },
    onAdd: async (parentId) => {
      const newDoc = await createDocument({
        'title': '',
        'parent': parentId
      })
      console.log(newDoc)
      // change route (newDoc id)
      this.setState()
    },
    onRemove: async (documentId) => {
      const deleted = await deleteDocument(documentId)
      console.log(deleted)
      this.setState()
    }
  })


  new Footer({
    $target: $page,
    onAddRoot: async () => {
      const newRootDoc = await createDocument({
        'title': '',
        'parent': null
      })
      // change route (newDoc id)
      this.setState()
    }
  })



  this.setState = async () => {
    const rootDocs = await getDocument()
    docList.setState(rootDocs)
  }

  this.setState()
}