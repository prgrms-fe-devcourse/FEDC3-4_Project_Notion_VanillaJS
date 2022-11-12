import PostList from "./PostList.js";
import { request } from "./api.js";

export default function PostPage({ $target, initialState }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target,
    initialState: [],
    onRemove: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      history.pushState(null, null, "/");
      this.render();
    },
    newDocunment: async (id, button) => {
      if (button === "add") {
        const document = {
          title: "new",
          parent: id,
        };
        const newDocument = await newRequest(document);
        this.render();
      }
    },
  });

  const fetchRequest = async () => {
    const data = await request("/documents");
    postList.setState(data);
  };

  const newRequest = async (document) => {
    const newRequest = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify(document),
    });
  };

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };
  //this.setState가 필요할까??

  this.render = async () => {
    await fetchRequest();
    $target.appendChild($page);
  };

  this.render();
}
