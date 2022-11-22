import { request } from "../utils/api.js";
import { isNew } from "../utils/isNew.js";
import Editor from "./Editor.js";
import Footer from "./Footer.js";
import Saving from "./Saving.js";

export default function EditorPage({ $target, initialState, onChange }) {
  isNew(EditorPage, this);
  const $editorPage = document.createElement("div");
  $editorPage.className = "editor-page";

  this.state = initialState;

  const post = {
    title: "",
    content: "",
  };

  let timer = null;

  const saving = new Saving({
    $target: $editorPage,
    initialState: null,
  });

  const editor = new Editor({
    $target: $editorPage,
    initialState: post,
    onEditing: async (post) => {
      if (timer !== null) {
        saving.setState(true);
        clearTimeout(timer);
        clearInterval(timer);
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
        saving.setState(false);
        onChange();
        timer = setInterval(() => saving.setState("remove"), 500);
      }, 500);
    },
  });

  const footer = new Footer({
    $target: $editorPage,
    initialState: {
      id: null,
      title: "",
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
      footer.setState({
        id: document.documents.map((el) => el.id),
        title: document.documents.map((el) => el.title),
      });
    }
    this.render();
  };

  this.render = () => {
    $target.appendChild($editorPage);
  };
}
