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

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      $target.innerHTML = "";
      await postsPage.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      await postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());

  window.addEventListener("title-change", () => {
    postsPage.setState();
  });

  window.addEventListener("popstate", () => this.route());
}
