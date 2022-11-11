import { request } from "./api.js";
import { initRouter, push } from "./router.js";
import { getItem, setItem, removeItem } from "./storage";
import PostPage from "./routes/PostPage.js";
import SideBar from "./routes/SideBar.js";

export default function App({ $target }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.$loading = document.createElement("div");
  this.$loading.id = "loading";
  this.$loading.innerHTML = `
    <div class="loading_animation"></div>
    <div class="center"/>
      <span>Loading...</span>
    </div>
  `;
  $target.appendChild(this.$loading);

  this.state = {
    onClickAddID: null,
    res_document: [],
    res_content: [],
  };

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;

    sideBar.setState(this.state);
    postPage.setState(this.state);
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
      await request(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });

      this.fetch(this.state.res_content.id);
    },
    onDelete: async (id) => {
      this.setState({
        ...this.state,
        isLoading: true,
      });

      const res = await request(`/${id}`, {
        method: "DELETE",
      });
      if (res.parent) {
        this.fetch(res.parent.id);
      } else {
        this.fetch();
      }

      this.setState({
        ...this.state,
        isLoading: true,
      });
    },
  });

  this.init = async () => {
    try {
      const { id } = getItem("currentContentId", null);
      const inProgressContent = getItem("inProgressContent", null);

      if (inProgressContent) {
        if (confirm("작성중이던 글이 있습니다. 불러올까요?")) {
          await request(`/${id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: inProgressContent.title,
              content: inProgressContent.components,
            }),
          });

          setItem("currentContentId", JSON.stringify({ id, isNeedRender: true }));
        }
      }

      await this.fetch(id);
    } catch (e) {
      console.error(e);
    } finally {
      $target.removeChild(this.$loading);
    }
  };

  this.fetch = async (targetId) => {
    const res_document = await request("/");

    const initTarget = targetId || res_document[0].id;
    const res_content = await request(`/${initTarget}`);

    this.setState({
      ...this.state,
      res_document,
      res_content,
    });

    setItem("currentContentId", JSON.stringify({ id: initTarget, isNeedRender: true }));
    removeItem("inProgressContent");
  };

  this.init();

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

  window.addEventListener("popstate", () => this.route());

  initRouter(() => this.route());
}
