import { request } from "./api.js";
import { initRouter, push } from "./router.js";
import PostPage from "./routes/PostPage.js";
import SideBar from "./routes/SideBar.js";

export default function App({ $target }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.state = {
    isLoading: false,
    onClickAddID: null,
    res_document: [],
    res_content: [],
  };

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;
    postPage.setState(this.state);
    sideBar.setState(this.state);
  };

  const sideBar = new SideBar({
    $target,
    initialState: this.state,
    onClickAdd: (id) => {
      this.setState({
        ...this.state,
        onClickAddID: id,
      });

      push(`/posts/new`);
    },
  });

  const postPage = new PostPage({
    $target,
    initialState: this.state,
    onEditing: async ({ id, title, content }) => {
      const res = await request(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const nextState = { ...this.state.res_content };

      nextState.title = res.title;
      nextState.content = res.content;

      this.setState({
        ...this.state,
        res_content: nextState,
      });

      this.fetch(this.state.res_content.id);
    },
    onDelete: async (id) => {
      const res = await request(`/${id}`, {
        method: "DELETE",
      });

      this.fetch(res.parent.id);
    },
  });

  this.init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });

      this.fetch();
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  this.fetch = async (targetId) => {
    const res_document = await request("/");
    const res_content = await request(`/${targetId || res_document[0].id}`);

    this.setState({
      ...this.state,
      res_document,
      res_content,
    });
  };

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");

      if (postId === "new") {
        const res = await request("/", {
          method: "POST",
          body: JSON.stringify({
            title: "",
            parent: this.state.onClickAddID,
          }),
        });

        push(`/posts/${res.id}`);
      } else {
        this.fetch(postId);
      }
    }
  };

  this.init();
  initRouter(() => this.route());
}
