import Sidebar from "./components/sidebar/Sidebar.js";
import PostEditPage from "./components/posts/PostEditPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const $sidebar = document.createElement("div");
  const $postEditPage = document.createElement("div");

  $target.appendChild($sidebar);
  $target.appendChild($postEditPage);

  const sidebar = new Sidebar({ $target: $sidebar });

  const postEditPage = new PostEditPage({
    $target: $postEditPage,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    } else {
      sidebar.setState();
    }
  };

  this.route();

  initRouter(() => this.route());
}
