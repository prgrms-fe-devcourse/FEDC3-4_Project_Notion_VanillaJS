import {
  createNewDocument,
  deleteDocument,
  getRootDocuments,
} from "../apis/documentApi.js";
import DocumentNode from "./DocumentNode.js";
import { className } from "../utils/constants.js";
import { messages } from "../utils/messages.js";
import { navigate } from "../utils/router.js";
import { getDocumentIdFromPathname } from "../utils/documentId.js";

function DocumentTree({ $target, initialState }) {
  const $tree = document.createElement("section");
  $target.appendChild($tree);

  const { treeRootAddButton } = className;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const checkDocumentIdAndRoute = (documentId) => {
    if (getDocumentIdFromPathname() === documentId) {
      navigate("/");
    }
  };

  this.render = () => {
    $tree.innerHTML = `
      <div class="${treeRootAddButton}">
        <span class="material-symbols-outlined">add</span>
        <span>새로운 문서</span>
      </div>
    `;

    new DocumentNode({
      $target: $tree,
      initialState: {
        data: this.state.data,
      },
      onCreate: (parentId) => {
        this.createDocument(parentId);
      },
      onDelete: async (documentId) => {
        const answer = confirm(messages.askDelete);
        if (!answer) return;

        await deleteDocument(documentId);
        this.getData();

        checkDocumentIdAndRoute(documentId);
      },
    });
  };

  this.getData = async () => {
    const data = await getRootDocuments();
    this.setState({
      ...this.state,
      data,
    });
  };

  this.createDocument = async (parentId) => {
    const title = prompt(messages.askNewTitle);

    if (title === null) {
      return;
    }

    if (!title.trim()) {
      alert(messages.invalidTitle);
      return;
    }

    const newData = {
      title: title.trim(),
      parent: parentId,
    };

    const { id } = await createNewDocument(newData);
    navigate(`/documents/${id}`);

    this.getData();
  };

  this.init = () => {
    this.getData();
  };

  this.init();

  $tree.addEventListener("click", (e) => {
    const $div = e.target.closest("div");

    if ($div?.className === treeRootAddButton) {
      this.createDocument(null);
    }
  });
}

export default DocumentTree;
