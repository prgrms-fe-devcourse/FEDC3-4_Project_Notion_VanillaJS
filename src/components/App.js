import { initRoute, push } from "../utils/router.js";
import { clearDiv } from "../utils/clearDiv.js";
import DocumentPage from "./DocumentPage.js";
import EditorPage from "./EditorPage.js";
import MainPage from "./MainPage.js";

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

  const mainPage = new MainPage({
    $target,
    initialState: "김민우",
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      documentPage.render();
      mainPage.render();
      clearDiv(".editor-page");
    } else if (pathname.indexOf("/documents/") === 0) {
      clearDiv(".main-page");
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
