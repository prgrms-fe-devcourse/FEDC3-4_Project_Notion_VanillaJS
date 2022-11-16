import { request } from "../utils/api.js";
import Editor from "../components/Editor.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";

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
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        await request(`/documents/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
        });

        const prevPost = this.state.post;
        if (prevPost.title !== post.title) {
          window.dispatchEvent(new CustomEvent("title-change"));
        }

        removeItem(postLocalSaveKey);
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

  const createPost = async () => {
    const createdPost = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        content: "",
      }),
    });
    history.replaceState(null, null, `/posts/${createdPost.id}`);
    this.setState({
      postId: createdPost.id,
    });
  };

  this.setState = async (nextState) => {
    if (nextState.postId === "new") {
      await createPost();
      return;
    }

    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${this.state.postId}`;
      this.state = nextState;

      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(post);
      }
      await fetchPost();
      return;
    }

    if (nextState.post) {
      this.state = nextState;
    }
    this.render();
    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
