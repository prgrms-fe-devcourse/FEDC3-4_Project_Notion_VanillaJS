import PostEditPage from "./pages/PostEditPage.js";
import PostPage from "./pages/PostPage.js";
import { initRouter, push } from "./util/router.js";
import Home from "./components/Introduce.js";

export default function App({ $target }) {
  const postPage = new PostPage({ $target });

  const home = new Home({ $target });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: null,
      post: {
        title: "",
        content: "",
      },
    },
    onUpdateList: () => {
      postPage.setState();
    },
  });

  this.route = () => {
    home.render();
    postEditPage.render();
    const { pathname } = window.location;

    if (pathname === "/") {
      postPage.setState();
      postEditPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId, isNew] = pathname.split("/");
      if (!isNew) {
        postEditPage.setState({ ...postEditPage.state, postId });
        postPage.setState();
      } else {
        postEditPage.setState({
          postId: `new-${postId}`,
          post: {
            title: "",
            content: "",
          },
        });
      }
    }
  };

  this.route();

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());
}
