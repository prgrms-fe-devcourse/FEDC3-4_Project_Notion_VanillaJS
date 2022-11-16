import { request } from "../../api.js";
import BreadCrumb from "./BreadCrumb.js";
import Editor from "./Editor.js";
import { push } from "../../router.js";
import SubLink from "./SubLink.js";
import { validation } from "../../validation.js";

//여기에선 docId만 핸들, Editor에는 Doc만
export default function EditorContainer({ $target, initialState }) {
  validation(new.target, "EditorContainer");

  const $editorContainer = document.createElement("section");
  $editorContainer.className = "editContainer";

  this.state = initialState;

  let timer = null;

  const breadCrumb = new BreadCrumb({
    $target: $editorContainer,
    initialState: this.state,
    clickPath: (id) => {
      push(`/documents/${id}`);
    },
  });

  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.doc,
    onEdit: (post) => {
      document.getElementById(post.id).getElementsByTagName("span")[0].innerText = post.title;

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await request(`/documents/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
        });
      }, 500);
    },
  });

  const subLink = new SubLink({
    $target: $editorContainer,
    initialState: this.state,
    clickLink: (id) => {
      push(`/documents/${id}`);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.docId !== nextState.docId) {
      this.state = nextState;
      await fetchDoc();
      return;
    }
    this.state = nextState;

    this.render();
    breadCrumb.setState(this.state);
    subLink.setState(this.state);
    editor.setState(this.state.doc || { title: "", content: "" });
  };

  this.render = () => {
    $target.appendChild($editorContainer);
  };

  const fetchDoc = async () => {
    const { docId } = this.state;
    const doc = await request(`/documents/${docId}`);

    this.setState({
      ...this.state,
      doc,
    });
  };
}
