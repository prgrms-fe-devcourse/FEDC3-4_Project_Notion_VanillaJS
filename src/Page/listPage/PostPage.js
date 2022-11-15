import PostList from "./PostList.js";
import { request } from "../../utils/api.js";
import { push } from "../../utils/router.js";
import Header from "./Header.js";

export default function PostPage({ $target, editUpdate }) {
  const $page = document.createElement("div");
  $page.classList.add("listPage");

  new Header({
    $target: $page,
    initialState: {
      user: "zero",
      email: "yj0zero@gmail.com",
    },
  });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onRemove: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      push("/");
    },
    onAddDocument: async (id, name) => {
      if (name === "add") {
        const document = {
          title: "new",
          parent: id,
        };
        const newDocument = await fetchNewDocument(document);
        push(`/documents/${newDocument.id}`);
        this.render();
      }
    },
  });

  const fetchList = async () => {
    const data = await request("/documents");
    postList.setState(data);
  };

  const fetchNewDocument = async (document) => {
    const newRequest = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify(document),
    });

    return await newRequest;
  };

  this.render = async () => {
    await fetchList();
    $target.appendChild($page);
  };

  this.render();
}
