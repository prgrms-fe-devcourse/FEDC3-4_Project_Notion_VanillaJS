import { initRoute, push } from "../utils/router.js";
import DocumentPage from "./DocumentPage.js";
import EditorPage from "./EditorPage.js";

export default function App({ $target }) {
  const documentPage = new DocumentPage({
    $target,
    onClickTitle: async (id) => {
      push(`/documents/${id}`);
    },
  });

  const editorPage = new EditorPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;

    if (pathname === "/") {
      documentPage.fetchDocument();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      documentPage.fetchDocument();
      editorPage.setState({ documentId });
    }
  };

  this.route();

  initRoute(() => this.route());
}
