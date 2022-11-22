import { initRoute, push } from "../utils/router.js";
import { removeElementBySelector } from "../utils/removeElementBySelector.js";
import DocumentSection from "./DocumentSection.js";
import EditorPage from "./EditorPage.js";
import MainPage from "./MainPage.js";
import { isNew } from "../utils/isNew.js";

export default function App({ $target }) {
  isNew(App, this);
  const documentSection = new DocumentSection({
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
      documentSection.render();
    },
  });

  const mainPage = new MainPage({
    $target,
    initialState: "김민우",
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      documentSection.render();
      mainPage.render();
      removeElementBySelector(".editor-page");
    } else if (pathname.indexOf("/documents/") === 0) {
      removeElementBySelector(".main-page");
      const [, , documentId] = pathname.split("/");
      editorPage.setState({
        ...editorPage.state,
        documentId,
      });
      documentSection.render();
    }
  };

  this.route();
  initRoute(() => this.route());
}
