import PostList from "./PostList.js";
import { request } from "../api.js";
import NewPostBtn from "./NewPostBtn.js";

export default function PostPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "sidebar";

  $target.appendChild($page);

  this.state = {
    documents: [],
  };

  const postList = new PostList({
    $target: $page,
    initialState: this.state,
    onSelect: () => {},
    onAdd: async (id) => {
      console.log(`${id}에 추가`);
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
      console.log(`${id}삭제`);
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
