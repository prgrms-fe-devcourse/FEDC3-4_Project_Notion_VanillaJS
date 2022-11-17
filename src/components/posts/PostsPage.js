import { request } from "../../utils/api.js";
import LinkButton from "../../utils/button.js";
import PostList from "./PostList.js";

export default function PostsPage({ $target }) {
  const $postsPage = document.createElement("div");
  $postsPage.className = "posts-page";

  const postList = new PostList({
    $target: $postsPage,
    initialState: [],
  });

  console.log("postsPage");

  new LinkButton({
    $target: $postsPage,
    initialState: {
      text: "New Post",
      link: "/posts/new",
    },
  });

  this.setState = async () => {
    const posts = await request("/posts");
    postList.setState(posts);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($postsPage);
  };
}
