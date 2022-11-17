import Sidebar from "./components/Sidebar/Sidebar.js";
import PostPage from "./components/PostPage/PostPage.js";

import { getDocumentContent } from "./api/api.js";

import { validateInstance } from "./utils/validation.js";
import { addEvent } from "./utils/custom-event.js";

export default function App({ $target }) {
  validateInstance(new.target);

  const $app = document.createElement("div");
  $target.appendChild($app);

  const sidebar = new Sidebar({ $target: $app });

  const postPage = new PostPage({
    $target: $app,
    initialState: {
      postId: 0,
      title: "",
      content: "",
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      sidebar.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");

      const documentData = await getDocumentContent(postId);

      const { title, content, documents } = documentData;
      postPage.setState({
        postId,
        title,
        content,
        documents,
      });

      sidebar.setState();
    }
  };

  const init = () => {
    this.route();

    addEvent.initRouter(() => this.route());

    window.addEventListener("popstate", () => {
      this.route();
    });
  };

  init();
}
