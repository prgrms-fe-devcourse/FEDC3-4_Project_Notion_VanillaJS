import PostList from "./DocList.js";
import { request } from "../api.js";
import NewPostBtn from "./NewDocBtn.js";
import { push } from "../router.js";

export default function PostPage({ $target, getSelectedId }) {
  const $sideBar = document.createElement("div");
  $sideBar.className = "sidebar";

  $target.appendChild($sideBar);

  const $HomeButton = document.createElement("button");
  $HomeButton.className = "home-button";
  $HomeButton.innerHTML = "Notion 홈으로";
  $sideBar.appendChild($HomeButton);

  $HomeButton.addEventListener("click", (e) => {
    push("/");
    this.render();
  });

  this.state = {
    documents: [],
  };

  const postList = new PostList({
    $target: $sideBar,
    initialState: this.state,
    onSelect: (id) => {
      getSelectedId(id);
    },
    onAdd: async (id) => {
      const documents = {
        title: `제목 없음`,
        parent: id,
      };
      const childDoc = await request(`/`, {
        method: "POST",
        body: JSON.stringify(documents),
      });
      push(`/documents/${childDoc.id}`);
      this.setState();
    },
    onDelete: async (id) => {
      await request(`/${id}`, {
        method: "DELETE",
      });
      this.setState();
    },
  });

  new NewPostBtn({
    $target: $sideBar,
    addPost: async () => {
      const documents = {
        title: "제목 없음",
        parent: null,
      };
      const newPage = await request(`/`, {
        method: "POST",
        body: JSON.stringify(documents),
      });
      push(`/documents/${newPage.id}`);
      this.setState();
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    const documents = await request("/");
    postList.setState({ documents: documents });
    this.render();
  };

  this.render = () => {
    $target.appendChild($sideBar);
  };

  const init = async () => {
    const documents = await request("/");
    this.setState(documents);
  };

  init();
}
