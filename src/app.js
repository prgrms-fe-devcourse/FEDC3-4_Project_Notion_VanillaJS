import { request } from "../Api/api.js";
import Editor from "./Editor/editor.js";
import { createPost, getPost, removePost } from "./postListUtil.js";
import Sidebar from "./sidebar.js";

export default function App({ $target }) {
  this.setState = (nextState) => {
    this.state = nextState;
    sideBar.setState(nextState);
  };

  const sideBar = new Sidebar({
    $target,
    initialState: this.state,
  });

  const $postList = document.querySelector(".postList");

  const editor = new Editor({
    $target,
  });

  const $editor = document.querySelector(".right");

  $postList.addEventListener("@CreateChildDoc", async (e) => {
    const res = await createPost(e.detail.id);
    editor.setState({
      title: res.title,
      content: "",
      id: parseInt(res.id),
    });
    this.init();
  });

  $postList.addEventListener("@EditDoc", async (e) => {
    const res = await getPost(e.detail.id);
    editor.setState({
      title: res.title,
      content: res.content,
      id: parseInt(e.detail.id),
    });
  });

  $postList.addEventListener("@RemoveDoc", async (e) => {
    await removePost(e.detail.id);
    this.init();
  });

  $postList.addEventListener("@CreateNewDoc", async (e) => {
    const res = await createPost();
    editor.setState({
      title: res.title,
      content: "",
      id: parseInt(res.id),
    });
    this.init();
  });

  $editor.addEventListener("@ReviseCompleted", (e) => {
    this.init();
  });

  this.init = async () => {
    const result = await request("/documents");
    this.setState(result);
  };

  this.init();
}
