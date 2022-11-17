import {
  createNewDocument,
  deleteDocumet,
  getRootDocuments,
} from "../utils/fetchData.js";
import DocumentNode from "./DocumentNode.js";
import { className } from "../utils/constants.js";
import { messages } from "../utils/messages.js";

function DocumentTree({ $target, initialState }) {
  const $tree = document.createElement("section");
  $target.appendChild($tree);

  const { treeRootAddButton } = className;
  const { messageForDelete, messageForCreate, errorMessageInvalidTitle } =
    messages;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
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
      onClick: (parentId) => {
        this.onClick(parentId);
      },
      onDelete: (documentId) => {
        const answer = confirm(messageForDelete);

        if (answer) {
          this.delete(documentId);
        }
      },
    });
  };

  this.delete = async (documentId) => {
    await deleteDocumet(documentId);
    this.getData();
  };

  this.getData = async () => {
    const data = await getRootDocuments();
    this.setState({
      ...this.state,
      data,
    });
  };

  this.onClick = (parentId) => {
    const title = prompt(messageForCreate);

    if (title === null) {
      return;
    }

    if (!title.trim()) {
      alert(errorMessageInvalidTitle);
      return;
    }

    const newData = {
      title: title.trim(),
      parent: parentId,
    };

    createNewDocument(newData);
    this.getData();
  };

  this.init = () => {
    this.getData();
  };

  this.init();

  $tree.addEventListener("click", (e) => {
    const $div = e.target.closest("div");

    if ($div?.className === treeRootAddButton) {
      this.onClick(null);
    }
  });
}

export default DocumentTree;
