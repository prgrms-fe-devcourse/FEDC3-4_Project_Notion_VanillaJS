import PostsPage from "./pages/PostsPage.js";
import PostEditPage from "./pages/PostEditPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
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

    if (pathname === "/") {
      $target.innerHTML = "";
      postsPage.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      if ($target.innerHTML === "") {
        postsPage.setState();
      }
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());

  window.addEventListener("update-tree", () => {
    postsPage.setState();
  });

  window.addEventListener("popstate", () => this.route());
}
