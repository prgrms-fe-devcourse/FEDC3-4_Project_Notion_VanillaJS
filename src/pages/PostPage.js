import PostList from "../components/PostList.js";
import { createPost, fetchPostList, deletePost } from "../util/api.js";
import LinkButton from "../components/LinkButton.js";
import Header from "../components/Header.js";
import { push } from "../util/router.js";

export default function PostPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "postpage";
  $target.appendChild($page);

  this.setState = async () => {
    const posts = await fetchPostList();
    postList.setState(posts);
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
      console.log(parentId, createdPost);
      //push(`/posts/${createdPost.id}`);
      this.setState();
    },
    onDelete: async (id) => {
      deletePost(id);
      push("/");
    },
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "+&nbsp&nbsp새로운 페이지 추가",
      link: "/documents/new",
    },
    className: "newPostButton",
  });
}
