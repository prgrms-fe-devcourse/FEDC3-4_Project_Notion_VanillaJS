import PostsPage from "./pages/PostsPage.js";
import PostEditPage from "./pages/PostEditPage.js";

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
      postsPage.render();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();
}
