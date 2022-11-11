import { request } from "../utils/api.js";
import Editor from "./Editor.js";

export default function EditorPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  const post = {
    title: "",
    content: "",
  };

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: async (post) => {
      const id = window.location.pathname.split("/")[2];
      await request(`/documents/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
        }),
      });
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    const document = await request(`/documents/${this.state.documentId}`);
    editor.setState({
      title: document.title,
      content: document.content,
    });
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
