import PostPage from "./PostPage.js";
import PostEditPage from "./PostEditPage.js";
import { request } from "./Api.js";
import { initRouter } from "./router.js";

export default function App({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {};

  const postPage = new PostPage({
    $target,
    initialState,
    // onPostClick: (id) => {
    //   history.pushState(null, null, `/posts/${id}`);
    //   this.route();
    // },
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

  this.route = () => {
    // 비우기 코드
    $target.innerHTML = "";

    const { pathname } = window.location;
    if (pathname === "/") {
      postPage.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
