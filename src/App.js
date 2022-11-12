import DocumentListPage from "./components/view/DocumentListPage.js";
import EditorPage from "./components/view/EditorPage.js";
import { initRouter } from "./router/router.js";

export default function App({ $bodyPage }) {
  $bodyPage.style.display = "flex";

  const documentListPage = new DocumentListPage({
    $bodyPage,
  });

  const editorPage = new EditorPage({
    $bodyPage,
  });

  this.router = () => {
    const { pathname } = location;

    if (pathname === "/index.html") {
      documentListPage.documentListSetState();
      editorPage.editorPageSetState();
    }

    if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      documentListPage.documentListSetState();
      editorPage.editorPageSetState({ id });
    }
  };

  this.router();

  initRouter(this.router);
}
