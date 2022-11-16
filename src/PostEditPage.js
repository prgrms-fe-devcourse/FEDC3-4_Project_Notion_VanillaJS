import Editor from "./Editor.js";
import LinkButton from "./LinkButton.js";
import { getItem, removeItem, setItem } from "./storage.js";
import { createPost, changePost, fetchPost } from "../utils/api.js";

export default function PostEditPage({ $target, initialState }) {
  if (!(this instanceof PostEditPage)) {
    throw new Error("new로 생성하지 않았습니다.");
  }
  const $page = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;
  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: this.state.post,

    onEditing: post => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          id: this.state.postId,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === "new";
        if (isNew) {
          const createdPost = createPost(post);
          history.replaceState(null, null, `${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            postId: createdPost.id,
          });
        } else {
          changePost(post);
          removeItem(postLocalSaveKey);
        }
      }, 1000);
    },
  });

  this.setState = async nextState => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;

      this.state = nextState;

      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(post);
      } else {
        await handleFetchPost();
      }

      return;
    }
    this.state = nextState;
    this.render();

    editor.setState(
      this.state.post || {
        id: this.state.postId,
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($page);
  };

  // 해당 id url 요청
  const handleFetchPost = async () => {
    const { postId } = this.state;
    if (postId !== "new") {
      const post = await fetchPost(postId);
      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
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

  new LinkButton({
    $target: $page,
    initialState: {
      id: "go-to-list",
      text: "목록으로",
      link: "/",
    },
  });
}
