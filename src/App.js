import Sidebar from "./components/Sidebar/Sidebar.js";
import DocumentPage from "./components/Document/Document.js";

import { getDocumentContent } from "./api/api.js";

import { validateInstance } from "./utils/validation.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  validateInstance(new.target);

  const $app = document.createElement("div");
  $target.appendChild($app);

  const sidebar = new Sidebar({ $target: $app });

  const documentPage = new DocumentPage({
    $target: $app,
    initialState: {
      documentId: 0,
      title: "",
      content: "",
    },
    onUpdateTitle: () => {
      sidebar.setState();
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      sidebar.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");

      const documentData = await getDocumentContent(documentId);

      const { title, content, documents } = documentData;
      documentPage.setState({
        documentId,
        title,
        content,
        documents,
      });

      sidebar.setState();
    }
  };

  const init = () => {
    this.route();

    initRouter(this.route);

    window.addEventListener("popstate", () => {
      this.route();
    });
  };

  init();
}
