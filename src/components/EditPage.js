import { request } from "../api.js";
import { getItem, removeItem, setItem } from "../storage.js";
import ChildDocument from "./ChildDocument.js";
import Editor from "./Editor.js";
import TopBar from "./TopBar.js";

export default function EditPage({ $target, initialState, getTitleChange }) {
  const $editPage = document.createElement("div");
  $editPage.className = "Edit-page";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.documents.id}`;

  let timer = null;

  const topBar = new TopBar({ $target: $editPage, initialState: this.state });

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
        // this.setState(changePost);
      }, 100);
    },
  });

  const childDocument = new ChildDocument({ $target: $editPage });

  this.setState = async (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
    // topBar.setState(this.state);
    editor.setState(this.state);
    childDocument.setState(this.state);
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
