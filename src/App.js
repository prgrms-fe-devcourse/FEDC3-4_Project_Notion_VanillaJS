import Sidebar from "./components/sidebar/Sidebar.js";
import PostsPage from "./components/posts/PostsPage.js";
import PostEditPage from "./components/posts/PostEditPage.js";
import { initRouter } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({ $target });

  // const postsPage = new PostsPage({
  //   $target,
  // });

  // const postEditPage = new PostEditPage({
  //   $target,
  //   initialState: {
  //     postId: "new",
  //     post: {
  //       title: "",
  //       content: "",
  //     },
  //   },
  // });

  // this.route = () => {
  //   $target.innerHTML = "";
  //   const { pathname } = window.location;

  //   if (pathname === "/") {
  //     postsPage.setState();
  //   } else if (pathname.indexOf("/posts/") === 0) {
  //     const [, , postId] = pathname.split("/");
  //     postEditPage.setState({ postId });
  //   }
  // };

  // this.route();

  // initRouter(() => this.route());
}
