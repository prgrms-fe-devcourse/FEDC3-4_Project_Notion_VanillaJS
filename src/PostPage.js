import PostList from "./PostList.js";
import { request } from "./api.js";
import LinkButton from "./LinkButton.js";
import Header from "./Header.js";
import { push } from "./router.js";

export default function PostPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "postpage";
  $target.appendChild($page);

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
  };

  new Header({
    $target: $page,
    $name: "BeNI",
  });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onAdd: (id) => {
      push(`/documents/${id}/new`);
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      push("/");
    },
  });

  const linkButton = new LinkButton({
    $target: $page,
    initialState: {
      text: "+&nbsp&nbsp새로운 페이지 추가",
      link: "/documents/new",
    },
  });
  linkButton.$linkButton.className = "newPostButton";
}
