import { fetchData } from "../utils/api.js";
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
      <h1>트리</h1>
    `;
    new DocumentNode({
      $target: $tree,
      initialState: { data: this.state.data },
      onClick: (parentId) => {
        const title = prompt("새로운 문서의 제목을 입력해주세요");
        const data = {
          title,
          parent: parentId,
        };
        createNewDocument(data);
      },
    });
  };

  const getRootDocuments = async () => {
    const data = await fetchData("/documents");

    this.setState({
      ...this.state,
      data,
    });
  };

  const createNewDocument = async (data) => {
    await fetchData("/documents", "POST", data);
  };

  this.init = () => {
    getRootDocuments();
  };

  this.init();
}

export default DocumentTree;
