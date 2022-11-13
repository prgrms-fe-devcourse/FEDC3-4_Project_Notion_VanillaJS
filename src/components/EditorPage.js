import { request } from "../utils/api.js";
import Editor from "./Editor.js";

export default function EditorPage({ $target, initialState, onChange }) {
  const $page = document.createElement("div");

  this.state = initialState;

  const post = {
    title: "",
    content: "",
  };

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: async (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const id = window.location.pathname.split("/")[2];
        await request(`/documents/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: post.title,
            content: post.content,
          }),
        });
        onChange();
      }, 500);
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    const document = await request(`/documents/${this.state.documentId}`);
    if (document.title === "") {
      editor.setState({
        title: "제목 없음",
        content: document.content,
      });
    } else {
      editor.setState({
        title: document.title,
        content: document.content,
      });
    }
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
