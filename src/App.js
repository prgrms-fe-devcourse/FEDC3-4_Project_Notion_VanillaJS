import PostPage from "./PostPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./router.js";
import { CheckNew } from "./Error.js";

export default function App({ $target, initialState }) {
  CheckNew(new.target);

  this.state = initialState;

  this.setState = (nextState) => {};

  const postPage = new PostPage({
    $target,
    initialState,
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      // ...this.state ?
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = async () => {
    // 비우기 코드
    //$target.innerHTML = "";

    const { pathname } = window.location;

    if (pathname === "/") {
      postPage.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      await postPage.setState();
      await postEditPage.setState({ postId });
    }
  };

  this.route();
  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
