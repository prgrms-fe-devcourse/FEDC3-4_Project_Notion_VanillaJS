import Header from "./Header.js";
import PostList from "./PostList.js";
import LinkButton from "./LinkButton.js";
import { request } from "../../utils/request.js";
import { deletePost, createPost } from "../../utils/api.js";
import { push } from "../../utils/router.js";

export default function PostPage({ $target }) {
  if (!(this instanceof PostPage)) {
    throw new Error("new로 생성하지 않았습니다.");
  }
  const $documentList = document.createElement("div");
  $documentList.setAttribute("class", "document-list");

  // header 생성
  new Header({
    $target: $documentList,
  });

  // postList 생성
  const postList = new PostList({
    $target: $documentList,
    initialState: [],

    onCreate: async parentId => {
      const post = {
        title: "",
        parent: parentId,
      };
      const newPost = await createPost(post);
      push(`/documents/${newPost.id}`);
    },

    onRemove: async id => {
      await deletePost(id);
      push("/");
    },
  });

  // 새 페이지 버튼 생성
  new LinkButton({
    $target: $documentList,
    initialState: {
      id: "new-btn",
      text: "+ 새 페이지",
      link: "/documents/new",
    },
  });

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($documentList);
  };
}
