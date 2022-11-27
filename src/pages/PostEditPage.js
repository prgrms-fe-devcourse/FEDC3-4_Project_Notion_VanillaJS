import { createPost, fetchPost, updatePost } from "../util/api.js";
import Editor from "../components/Editor.js";
import { getItem, removeItem, setItem } from "../util/storage.js";

export default function PostEditPage({ $target, initialState, onUpdateList }) {
  const $page = document.createElement("div");
  $page.className = "postEditPage";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const localPost = () =>
    getItem(postLocalSaveKey, {
      title: "",
      content: "",
    });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: localPost(),
    onEditing: (post) => {
      if (timer != null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        await updatePost(post);

        const prevPost = this.state.post;
        if (post.title !== prevPost.title) {
          onUpdateList();
        }

        removeItem(postLocalSaveKey);
      }, 200);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;

      if (this.state.postId) await setPost();
      return;
    }
    this.state = nextState;

    this.render();

    editor.setState(this.state.post);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const setPost = async () => {
    const { postId } = this.state;

    const post = await fetchPost(postId);

    const tempPost = localPost();

    if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
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
  };

  this.render();
}
