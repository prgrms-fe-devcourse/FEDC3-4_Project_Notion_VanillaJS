import { initRouter } from "../utils/router.js";
import { CheckNew } from "../utils/error.js";
import { request } from "../utils/api.js";
import PostPage from "./PostPage.js";
import PostEditPage from "./PostEditPage.js";

export default function App({ $target }) {
  CheckNew(new.target);

  this.state = {
    postId: null,
    posts: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    postPage.setState(nextState);
  };

  // 모든 문서 구조에 대한 정보가 필요함.
  // poastPage속의 function들을 여기로 끌고온다.
  // state의 변화가 있으면
  const postPage = new PostPage({
    $target,
    initialState: {
      postId: null,
      posts: [],
    },
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

  // 라우팅 할 때 fetch를 새로 받고, fetch에서 setState를 부른다.
  // setState에서는 컴포넌트들의 setState를 불러분다.
  this.route = async () => {
    await fetchPosts();

    const { pathname } = window.location;

    if (pathname === "/") {
      $target.innerHTML = "";
      postPage.render();

      this.setState({ ...this.state });
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });

      this.setState({
        ...this.state,
        postId,
      });
    }
  };

  // fetch에서 setState를 호출하는 형식으로 ㅂ꾸자.
  const fetchPosts = async () => {
    const posts = await request("documents", {
      method: "GET",
    });

    this.setState({
      ...this.state,
      posts,
    });
  };

  this.route();
  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
