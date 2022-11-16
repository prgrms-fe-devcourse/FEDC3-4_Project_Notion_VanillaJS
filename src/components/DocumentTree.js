import {
  createNewDocument,
  deleteDocumet,
  getRootDocuments,
} from "../utils/fetchData.js";
import DocumentNode from "./DocumentNode.js";

function DocumentTree({ $target, initialState }) {
  const $tree = document.createElement("section");
  $tree.className = "document-tree";
  $target.appendChild($tree);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $tree.innerHTML = `
      <div class="tree-subtitle-wrapper">
        <h4>문서 목록</h4>
        <button class="add-root-button">+</button>
      </div>
    `;

    new DocumentNode({
      $target: $tree,
      initialState: { data: this.state.data },
      onClick: (parentId) => this.onClick(parentId),
      onDelete: (documentId) => {
        const answer = confirm("문서를 정말 삭제하시겠습니까?");

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
    const title = prompt("새로운 문서의 제목을 입력해주세요");

    if (title === null) return;
    if (!title.trim()) {
      alert("올바른 제목을 입력해주세요.");
      return;
    }

    const data = {
      title: title.trim(),
      parent: parentId,
    };

    createNewDocument(data);
    this.getData();
  };

  this.init = () => {
    this.getData();
  };

  this.init();

  $tree.addEventListener("click", (e) => {
    const $button = e.target.closest("button");

    if ($button?.className === "add-root-button") {
      this.onClick(null);
    }
  });
}

export default DocumentTree;
