import PostEditPage from "./PostEditPage.js";
import PostPage from "./PostPage.js";
import { initRouter, push } from "./router.js";
import { request } from "./api.js";
import Home from "./Home.js";

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
    onAdd: (id) => {
      postEditPage.setState({
        postId: `new-${id}`,
        post: {
          title: "",
          content: "",
        },
      });
      push(`/documents/${id}/new`);
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      push("/");
    },
  });

  const home = new Home({ $target });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
    onUpdateList: () => {
      postPage.setState();
    },
  });

  this.route = () => {
    home.render();
    postEditPage.render();
    const { pathname } = window.location;

    if (pathname === "/") {
      postPage.setState();
      postEditPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId, isNew] = pathname.split("/");
      if (!isNew) {
        postEditPage.setState({ postId });
        postPage.setState();
      }
    }
  };

  this.route();

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());
}
