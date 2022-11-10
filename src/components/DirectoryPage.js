import { request } from "../utils/api.js";
import DirectoryList from "./DirectoryList.js";

export default function DirectoryPage({ $target }) {
  const $page = document.createElement("div");

  const post = {
    title: "제목 없음",
    parent: "null",
  };

  const directoryList = new DirectoryList({
    $target: $page,
    initialState: post,
    onClickRootAdd: async () => {
      const createPost = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify(post),
      });
    },
    onClickRemove: async (id) => {
      const removePost = await request(`/documents/${id}`, {
        method: "DELETE",
      });
    },
    onClickAdd: async (id) => {
      const addPost = await request(`/documents/`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: id,
        }),
      });
    },
  });

  this.setState = async () => {
    const posts = await request("/documents");
    directoryList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
