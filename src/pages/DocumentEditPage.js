import DocumentEditor from "../components/DocumentEditor.js";
import DocumentTree from "../components/DocumentTree.js";
import { getDocumentDetail } from "../utils/fetchData.js";
import { handleLocationChange } from "../utils/router.js";

function DocumentEditPage({ $target }) {
  const $editPage = document.createElement("div");
  $editPage.className = "main-content";
  $target.appendChild($editPage);

  const $tree = document.createElement("section");
  $tree.className = "document-tree";
  $editPage.appendChild($tree);
  new DocumentTree({ $target: $tree });

  const $editor = document.createElement("section");
  $editor.className = "document-editor";
  $editPage.appendChild($editor);

  // this.state = {
  //   data: {},
  // };

  // this.setState = (nextState) => {
  //   this.state = nextState;
  // };

  this.route = () => {
    const { pathname } = window.location;
    const [, , documentId] = pathname.split("/");

    if (documentId) {
      $editor.innerHTML = "";

      this.getData(documentId);

      this.documentEditor = new DocumentEditor({
        $target: $editor,
        initialState: {
          data: {},
        },
      });
    }
  };

  this.getData = async (documentId) => {
    const data = await getDocumentDetail(documentId);
    this.documentEditor.setState({
      data,
    });
  };

  this.init = () => {
    window.addEventListener("onChangeLocation", (e) =>
      handleLocationChange(e, this.route)
    );
    window.addEventListener("popstate", () => {
      route();
    });

    this.route();
  };

  this.init();
}

export default DocumentEditPage;
