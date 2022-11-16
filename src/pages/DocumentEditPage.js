import DocumentEditor from "../components/DocumentEditor.js";
import DocumentTree from "../components/DocumentTree.js";
import { getDocumentDetail, updateDocument } from "../utils/fetchData.js";
import { handleLocationChange } from "../utils/router.js";

function DocumentEditPage({ $target }) {
  const $editPage = document.createElement("div");
  $editPage.className = "main-content";
  $target.appendChild($editPage);

  const $tree = document.createElement("section");
  $tree.className = "document-tree";
  $editPage.appendChild($tree);

  const documentTree = new DocumentTree({ $target: $tree });

  const $editor = document.createElement("section");
  $editor.className = "document-editor-wrapper";
  $editPage.appendChild($editor);

  this.state = {
    data: {},
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.route = async () => {
    const { pathname } = window.location;
    const [, , documentId] = pathname.split("/");

    if (documentId) {
      $editor.innerHTML = "";

      const data = await getDocumentDetail(documentId);
      this.setState({
        data,
      });

      this.documentEditor = new DocumentEditor({
        $target: $editor,
        initialState: {
          data: this.state.data,
        },
        onChange: (newTitle, newContent) => {
          this.updateData(documentId, {
            title: newTitle,
            content: newContent,
          });
        },
      });
    }
  };

  this.updateData = async (documentId, data) => {
    await updateDocument(documentId, data);

    const newData = await getDocumentDetail(documentId);

    this.documentEditor.setState({
      data: newData,
    });

    documentTree.getData();
    return;
  };

  this.init = () => {
    window.addEventListener("onChangeLocation", (e) =>
      handleLocationChange(e, this.route)
    );
    window.addEventListener("popstate", () => {
      route();
    });
  };

  this.init();
}

export default DocumentEditPage;
