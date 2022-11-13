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
    onChange: () => {
      documentPage.render();
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      documentPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      editorPage.setState({
        ...editorPage.state,
        documentId,
      });
      documentPage.render();
    }
  };

  this.route();
  initRoute(() => this.route());
}
