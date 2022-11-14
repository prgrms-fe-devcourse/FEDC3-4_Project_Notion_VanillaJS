import { request } from "../utils/api.js";
import Editor from "../components/Editor.js";
import { getItem, setItem } from "../utils/storage.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
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
        setItem(postLocalSaveKey, {
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
      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });
      
      const tempSaveDate = tempPost.tempSaveDate;
      if (tempSaveDate && tempSaveDate > post.updatedAt) {
        if (confirm("저장되지 않은 데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            post: tempPost,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        post,
      });
    }
  };

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${this.state.postId}`;

      this.state = nextState;
      await fetchPost();
      return;
    }

    this.state = nextState;
    this.render();
    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };

  this.render = async () => {
    $target.appendChild($page);
  };

  this.render();
}
