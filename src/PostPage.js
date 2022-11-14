import PostList from "./PostList.js";
import { request } from "./api.js";
import { push } from "./router.js";

export default function PostPage({ $target, editUpdate }) {
  const $page = document.createElement("div");
  $page.className = "listPage";

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onRemove: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      history.pushState(null, null, "/");
      location.reload();
    },
    newDocunment: async (id, button) => {
      if (button === "add") {
        const document = {
          title: "new",
          parent: id,
        };
        const newDocument = await newRequest(document);
        push(`/documents/${newDocument.id}`);
        this.render();
      } else {
        push(`/documents/${id}`);
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

    return await newRequest;
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
