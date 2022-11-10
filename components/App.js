
import debounce from "../util/debounce.js";
import Sidebar from "./Sidebar.js";
import DocumentPage from "./DocumentPage.js";
import { initRouter } from "../util/route.js";

export default function App({ $app }) {
  const sidebar = new Sidebar({
    $target: $app,
  });

  const documentPage = new DocumentPage({
    $target: $app,
    getDocuments: () => sidebar.setState()
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      sidebar.setState();
      documentPage.setState({ documentId: null });
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      sidebar.setState();
      documentPage.setState({ documentId });
    }
  }

  this.route();
  initRouter(() => this.route());
}