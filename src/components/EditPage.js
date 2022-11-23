import { request } from "../api.js";
import { removeItem, setItem } from "../storage.js";
import ChildDocument from "./ChildDocument.js";
import Editor from "./Editor.js";

export default function EditPage({ $target, initialState, getTitleChange }) {
  const $editPage = document.createElement("div");
  $editPage.className = "Edit-page";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.documents.id}`;

  let timer = null;

  const editor = new Editor({
    $target: $editPage,
    initialState,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });
        const changePost = await request(`/${this.state.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
        });
        getTitleChange();
        removeItem(postLocalSaveKey);
      }, 100);
    },
  });

  const childDocument = new ChildDocument({ $target: $editPage });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    editor.setState(this.state);
    childDocument.setState(this.state);
  };

  this.render = () => {
    $target.appendChild($editPage);
  };
}
