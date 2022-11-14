import { request } from "../utils/api.js";
import PostList from "../components/PostList.js";

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
}
