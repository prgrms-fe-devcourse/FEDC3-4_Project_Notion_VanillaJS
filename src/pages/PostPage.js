import PostList from "../components/PostList.js";
import { createPost, fetchPostList, deletePost } from "../util/api.js";
import NewPostButton from "../components/NewPostButton.js";
import Header from "../components/Header.js";
import { push } from "../util/router.js";

export default function PostPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "postpage";

  this.setState = async () => {
    const posts = await fetchPostList();
    postList.setState(posts);
    this.render();
  };

  new Header({
    $target: $page,
    $name: "BeNI",
  });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onAdd: async (parentId) => {
      const createdPost = await createPost(parentId);
      push(`/documents/${createdPost.id}`);
      this.setState();
    },
    onDelete: async (id) => {
      deletePost(id);
      push("/");
      this.setState();
    },
  });

  new NewPostButton({
    $target: $page,
    onUpdate: () => {
      this.setState();
    },
  });

  this.render = () => {
    $target.prepend($page);
  };
}
