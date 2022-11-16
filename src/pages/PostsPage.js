import { request } from "../utils/api.js";
import PostList from "../components/PostList.js";
import LinkButton from "../components/LinkButton.js";
import { push } from "../utils/router.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");
  $page.setAttribute("class", "posts-page");

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onCreate: async (parent) => {
      const createdPost = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent,
        }),
      });
      this.setState();
      push(`/posts/${createdPost.id}`);
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      this.setState();
      history.replaceState(null, null, "/");
      const $page = document.querySelector(".post-edit-page");
      if ($page) {
        $page.remove();
      }
    },
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "페이지 추가",
      link: "/posts/new",
    },
  });

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.prepend($page);
  };
}
