import PostPage from "./PostPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "../../utils/router.js";

export default function App({ $target }) {
  if (!(this instanceof App)) {
    throw new Error("new로 생성하지 않았습니다.");
  }

  // postPage 생성
  const postPage = new PostPage({
    $target,
    onPostClick: id => {
      history.pushState(null, null, `/documents/${id}`);
      this.route();
    },
  });

  // postEditPage 생성
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

  // route 생성
  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      postPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
