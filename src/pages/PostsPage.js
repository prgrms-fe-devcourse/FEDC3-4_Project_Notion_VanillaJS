import { createPost, deletePost, fetchPostList } from "../utils/api.js";
import PostList from "../components/PostList.js";
import LinkButton from "../components/LinkButton.js";
import { push } from "../utils/router.js";
import Header from "../components/Header.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");
  $page.setAttribute("class", "posts-page");

  const header = new Header({ $target: $page });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onCreate: async (parent) => {
      const createdPost = await createPost(parent);
      this.setState();
      push(`/posts/${createdPost.id}`);
    },
    onDelete: async (postId) => {
      await deletePost(postId);
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
      text: "+ 새 페이지",
      link: "/posts/new",
    },
    className: "page-create",
  });

  this.setState = async () => {
    header.render();
    const posts = await fetchPostList();
    postList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.prepend($page);
  };
}
