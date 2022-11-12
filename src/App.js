import PostEditPage from "./PostEditPage.js";
import PostPage from "./PostPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const $postListContainer = document.createElement("div");
  const $postEditContainer = document.createElement("div");

  $target.appendChild($postListContainer);
  $target.appendChild($postEditContainer);

  const postPage = new PostPage({
    $target: $postListContainer,
  });

  const postEditPage = new PostEditPage({
    $target: $postEditContainer,
    initialState: {
      postId: "new",
      posts: {
        title: "",
        content: "",
      },
    },
    listUpdate: () => {
      postPage.render();
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      postPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
