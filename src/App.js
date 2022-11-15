import PostPage from "./PostPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./router.js";
import { CheckNew } from "./Error.js";

export default function App({ $target, initialState }) {
  CheckNew(new.target);

  this.state = initialState;

  this.setState = (nextState) => {};

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

    // 의존성 발생
    listUpdate: () => {
      postPage.setState();
    },
  });

  this.route = async () => {
    // 비우기 코드
    //$target.innerHTML = "";

    const { pathname } = window.location;

    if (pathname === "/") {
      $target.innerHTML = "";
      postPage.render();
      await postPage.setState();
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
