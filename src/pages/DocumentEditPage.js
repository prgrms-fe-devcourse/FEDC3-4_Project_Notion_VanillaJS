import DocumentEditor from "../components/DocumentEditor.js";
import DocumentTree from "../components/DocumentTree.js";

function DocumentEditPage({ $target }) {
  const $editPage = document.createElement("div");
  $editPage.className = "main-content";
  $target.appendChild($editPage);

  new DocumentTree({ $target: $editPage });
  new DocumentEditor({ $target: $editPage });
}

export default DocumentEditPage;
