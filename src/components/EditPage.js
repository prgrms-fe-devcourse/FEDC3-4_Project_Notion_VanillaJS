import { request } from "../api.js";
import { getItem, removeItem, setItem } from "../storage.js";
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
        this.setState(changePost);
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
    editor.setState(this.state);
  };

  this.render = () => {
    $target.appendChild($editPage);
  };

  const fetchPost = async () => {
    const { id } = this.state;
    const post = await request(`/${id}`);
    editor.setState(post);
  };
}
