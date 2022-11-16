import DocsContainer from "./components/Documents/DocsContainer.js";
import EditorContainer from "./components/Editor/EditorContainer.js";
import { init } from "./components/utils/router/router.js";

export default function App({ $target }) {
  const docsContainer = new DocsContainer({
    $target,
  });

  const editorContainer = new EditorContainer({
    $target,
    onChange: () => {
      docsContainer.setState();
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    docsContainer.setState();
    if (pathname === "/") {
      editorContainer.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , docId] = pathname.split("/");
      editorContainer.setState({ id: docId });
    }
  };

  this.route();

  init(this.route);
}
