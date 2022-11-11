import PostList from "./PostList.js";
import { request } from "../api.js";
import NewPostBtn from "./NewPostBtn.js";
import { push } from "../router.js";

export default function PostPage({ $target, getId }) {
  const $page = document.createElement("div");
  $page.className = "sidebar";

  $target.appendChild($page);

  this.state = {
    documents: [],
  };

  const postList = new PostList({
    $target: $page,
    initialState: this.state,
    onSelect: async (id) => {
      history.pushState(null, null, `/documents/${id}`);
      getId(id);
    },
    onAdd: async (id) => {
      const documents = {
        title: `${id} 제목 없음`,
        parent: id,
      };
      await request(`/`, {
        method: "POST",
        body: JSON.stringify(documents),
      });
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
    $target: $page,
    addPost: async () => {
      const documents = {
        title: "제목 없음",
        parent: null,
      };
      // newPage: {id: 48611, title: '제목없음', createdAt, updatedAt}이 나온다
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
    postList.setState({ isOpen: false, documents: documents });
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const init = async () => {
    const documents = await request("/");
    this.setState(documents);
  };
  init();
}
