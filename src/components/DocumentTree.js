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
        // parent id, 새로운 문서의 title 입력 받기
        const title = prompt("새로운 문서의 제목을 입력해주세요");
        // 새로운 문서 생성 하기
      },
    });
  };

  const getRootDocuments = async () => {
    const data = await fetchData("/documents");
    // const data = await fetchData("/documents", "POST", {
    //   title: "첫 번째 문서",
    //   parent: null,
    // });

    this.setState({
      ...this.state,
      data,
    });
    console.log(this.state.data);
  };

  this.init = () => {
    getRootDocuments();
  };

  this.init();
}

export default DocumentTree;
