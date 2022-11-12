import PostList from "./PostList.js";
import { request } from "../api.js";
import NewPostBtn from "./NewPostBtn.js";
import { push } from "../router.js";

export default function PostPage({ $target, getSelectedId }) {
  const $page = document.createElement("div");
  $page.className = "sidebar";

  $target.appendChild($page);

  const $HomeButton = document.createElement("button");
  $HomeButton.innerHTML = "변건오 Notion";
  $page.appendChild($HomeButton);

  $HomeButton.addEventListener("click", (e) => {
    push("/");
    this.render();
  });

  this.state = {
    documents: [],
  };

  const postList = new PostList({
    $target: $page,
    initialState: this.state,
    onSelect: (id) => {
      getSelectedId(id);
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

  const fetchPosts = async () => {
    const posts = await request("/");
    postList.setState(posts);
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    // app에서 변경된 값을 가져와도 다시 fetch를 해서 postList로 또 갱신하니 바뀐 값이 안들어 갈 것같음
    const documents = await request("/");
    postList.setState({ documents: documents });
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };

  const init = async () => {
    const documents = await request("/");
    this.setState(documents);
  };
  init();
}
