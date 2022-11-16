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
    onClickAddID: null, // +(추가) 누른 노드의 ID
    res_document: [], // 좌측sideBar data
    res_content: null, // 우측 editor data
  };

  this.setState = (nextState) => {
    console.log(nextState);
    this.state = nextState;

    sideBar.setState(this.state);
    postPage.setState(this.state);
  };

  this.fetch = async (targetId) => {
    // targetId는 res_content로 가져올 데이터의 ID
    const res_document = await request("/");
    if (res_document.length > 0) {
      const initTarget = targetId || res_document[0].id;
      const res_content = await request(`/${initTarget}`);

      this.setState({
        ...this.state,
        res_document,
        res_content,
      });

      setItem("currentContentId", { id: initTarget, isNeedRender: true });
      removeItem("inProgressContent");
    } else {
      setItem("currentContentId", { id: null, isNeedRender: true });

      this.setState({
        ...this.state,
        res_document: [],
        res_content: null,
      });
    }
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
      const res = await request(`/${id}`, {
        method: "DELETE",
      });

      if (res.parent) {
        //삭제한 노드의 부모가 있는 경우 거기로 이동
        this.fetch(res.parent.id);
      } else {
        this.fetch(); //없다면 첫번째 루트로
      }
    },
  });

  this.init = async () => {
    try {
      const storageItem = getItem("currentContentId", null); //최근까지 보고있던 content의 ID
      let id = "";

      if (storageItem !== null) {
        id = storageItem.id; //최근까지 보고 있는 거 있다면 거기로 바로 이동
      } else {
        const res_document = await request("/");

        if (res_document.length) {
          //최근까지 보고 있는 거 없었다면 -> 데이터 있는지 확인하고 루트의 1번으로 이동
          id = res_document[0].id;
        } else {
          // //최근까지 보고 있는 거 없었다면 -> 데이터 있는지 확인하고 없다면 새로운 데이터 생성
          push(`/posts/new`);
        }
      }

      setItem("currentContentId", { id, isNeedRender: true });

      const inProgressContent = getItem("inProgressContent", null);

      if (id && inProgressContent) {
        //작성중인 글 있다면 불러오기
        if (confirm("작성중이던 글이 있습니다. 불러올까요?")) {
          await request(`/${id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: inProgressContent.title,
              content: inProgressContent.components,
            }),
          });
        }
      }

      await this.fetch(id);
    } catch (e) {
      console.error(e);
    } finally {
      $target.removeChild(this.$loading);
    }
  };

  this.init();

  window.addEventListener("popstate", () => this.route());

  initRouter(() => this.route());
}
