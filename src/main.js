import { request } from "./utils/api.js";
import PostList from "./PostList.js";

const $target = document.querySelector("#app");

const postList = new PostList({
  $target,
  initialState: [],
});

const fetchPosts = async () => {
  const posts = await request("/documents");
  postList.setState(posts);
};

fetchPosts();
