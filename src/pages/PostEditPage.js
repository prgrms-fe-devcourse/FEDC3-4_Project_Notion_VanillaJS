import { request } from "../utils/api.js";
import Editor from "../components/Editor.js";
import { getItem, setItem } from "../utils/storage.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  const TEMP_POST_SAVE_KEY = `temp-post-${this.state.postId}`;

  const post = getItem(TEMP_POST_SAVE_KEY, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: this.state.post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setItem("TEMP_POST_SAVE_KEY", {
          ...post,
          tempSaveDate: new Date(),
        });
      }, 1000);
    },
  });

  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== "new") {
      const post = await request(`/documents/${postId}`);

      this.setState({
        ...this.state,
        post,
      });
    }
  };

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;
      await fetchPost();
      return;
    }

    this.state = nextState;
    this.render();
    editor.setState(this.state.post);
  };

  this.render = async () => {
    $target.appendChild($page);
  };

  this.render();
}
