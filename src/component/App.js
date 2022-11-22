import { initRouter } from "../utils/router.js";
import { CheckNew } from "../utils/error.js";
import PostPage from "./PostPage.js";
import PostEditPage from "./PostEditPage.js";

export default function App({ $target, initialState }) {
  CheckNew(new.target);

  this.state = initialState;

  // 모든 문서 구조에 대한 정보가 필요함.
  const postPage = new PostPage({
    $target,
    initialState,
  });

  // 편집기에 보여줄 문서에 대한 정보만 필요함.
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
      postPage.render();
      await postPage.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      await postEditPage.setState({ postId });
      await postPage.setState({ postId });
    }
  };

  this.route();
  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
