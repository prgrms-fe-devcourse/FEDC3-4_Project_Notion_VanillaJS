import { request } from "../utils/api.js";
import PostList from "../components/PostList.js";
import LinkButton from "../components/LinkButton.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target,
    initialState: [],
  });

  const fetchPosts = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
  };

  this.render = async () => {
    await fetchPosts();
    $target.appendChild($page);
  };

  new LinkButton({
    $target: $page,
    initialState: {
      text: "페이지 추가",
    },
  });
}
