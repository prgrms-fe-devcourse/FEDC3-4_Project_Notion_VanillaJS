import { initRoute, push } from "../utils/router.js";
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
      const $div = document.querySelector(".editor-page");
      if ($div) {
        $div.remove();
      }
    } else if (pathname.indexOf("/documents/") === 0) {
      const $div = document.querySelector(".main-page");
      if ($div) {
        $div.remove();
      }
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
