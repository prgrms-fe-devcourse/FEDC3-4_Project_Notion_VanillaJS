import { request } from "../utils/api.js";
import DocumentList from "./DocumentList.js";

export default function DocumentPage({ $target }) {
  const $page = document.createElement("div");

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onClickRootAdd: async () => {
      const createPost = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: "null",
        }),
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
    documentList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
