import PostEditPage from "./pages/PostEditPage.js";
import PostPage from "./pages/PostPage.js";
import { initRouter, push } from "./util/router.js";
import HomePage from "./pages/HomePage.js";

export default function App({ $target }) {
  const postPage = new PostPage({ $target });

  const homePage = new HomePage({ $target });

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
    const { pathname } = window.location;

    if (pathname === "/") {
      $target.innerHTML = "";
      postPage.setState();
      homePage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      if ($target.innerHTML === "") {
        postPage.setState();
      }
      const [, , postId] = pathname.split("/");
      homePage.render();
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
