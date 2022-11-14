import DocListHeader from "./DocListHeader.js";
import DocList from "./DocList.js";
import DocListFooter from "./DocListFooter.js";
import { getDocument, createDocument, deleteDocument } from "../api.js";
import { push } from "../router.js";
import { makeElement } from "../../util/templates.js";

export default function DocListPage({ 
  $target,
  initialState = {
    documentId: ''
  } 
}) {
  const $page = makeElement('aside', 'doc-list-page', 'on')
  $target.appendChild($page)

  this.state = initialState;

  new DocListHeader({
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
      push(documentId);
    },
    onAdd: async (parentId) => {
      const newDoc = await createDocument({
        'title': '',
        'parent': parentId
      })
      push(newDoc.id);
    },
    onRemove: async (documentId) => {
      const deleted = await deleteDocument(documentId)
      // ** todo: add deleted doc's parent to setState
      this.setState()
    }
  })


  new DocListFooter({
    $target: $page,
    onAddRoot: async () => {
      const newRootDoc = await createDocument({
        'title': '',
        'parent': null
      })
      push(newRootDoc.id);
      this.setState()
    }
  })

  this.setState = async (nextState) => {
    const rootDocs = await getDocument();
    if(nextState) {
      const currentDoc = nextState;
      docList.setState({
        documents: rootDocs,
        openedDocId: currentDoc
      })    
    } else {
      docList.setState({
        documents: rootDocs,
      })
    }
  }
}