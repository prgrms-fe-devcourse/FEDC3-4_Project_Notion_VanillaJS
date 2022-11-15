import PostEditPage from "./Page/editPage/PostEditPage.js";
import StartPage from "./Page/editPage/StartPage.js";
import PostPage from "./Page/listPage/PostPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const $postListContainer = document.createElement("div");
  const $postEditContainer = document.createElement("div");

  $target.appendChild($postListContainer);
  $target.appendChild($postEditContainer);

  const startPage = new StartPage({
    $target: $postEditContainer,
  });

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
    $postEditContainer.innerHTML = "";
    const { pathname } = window.location;
    if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    } else {
      postPage.render();
      startPage.render();
    }
  };

  this.route();

  initRouter(() => this.route());
}
