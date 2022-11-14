import { request } from "../utils/api.js";
import PostList from "../components/PostList.js";
import LinkButton from "../components/LinkButton.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target: $page,
    initialState: [],
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

  this.render = async () => {
    $target.appendChild($page);
  };
}
