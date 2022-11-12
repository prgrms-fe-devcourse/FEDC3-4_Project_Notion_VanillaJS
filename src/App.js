import DocumentListPage from "./components/view/DocumentListPage.js";
import EditorPage from "./components/view/EditorPage.js";
import { initRouter } from "./router/router.js";

export default function App({ $bodyPage }) {
  $bodyPage.style.display = "flex";

  new DocumentListPage({
    $bodyPage,
  });

  const editorPage = new EditorPage({
    $bodyPage,
    initialState: {
      title: "",
      content: "",
    },
  });

  this.router = () => {
    const { pathname } = location;

    if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      editorPage.editorPageSetState({ id });
    }
  };

  this.router();

  initRouter(this.router);
}
