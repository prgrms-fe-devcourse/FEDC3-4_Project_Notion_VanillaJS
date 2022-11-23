import { initRouter } from "../utils/router.js";
import { CheckNew } from "../utils/error.js";
import { request } from "../utils/api.js";
import PostPage from "./PostPage.js";
import PostEditPage from "./PostEditPage.js";

export default function App({ $target }) {
  CheckNew(new.target);

  // fetch에서 setState를 호출하는 형식으로 ㅂ꾸자.
  const fetchPosts = async () => {
    const res = await request("documents", {
      method: "GET",
    });

    // this.setState(res);
    //res는 배열.
    return res;
  };

  const initialState = fetchPosts();

  this.state = {
    postId: null,
    posts: [],
  };

  this.setState = (nextState) => {
    const rootDocuments = fetchPosts();

    this.state = {
      postId: nextState ?? null,
      posts: rootDocuments,
    };

    postPage.setState(this.state);
  };

  // 모든 문서 구조에 대한 정보가 필요함.
  // poastPage속의 function들을 여기로 끌고온다.
  // state의 변화가 있으면
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
      //postPage.setState();
      this.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
      // postPage.setState({ postId });
      this.setState({ postId });
    }
  };

  this.route();
  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
