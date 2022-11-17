import { createPost, fetchPost, updatePost } from "../utils/api.js";
import Editor from "../components/Editor.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import SubPostList from "../components/SubPostList.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.setAttribute("class", "post-edit-page");

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

        await updatePost(post);

        const prevPost = this.state.post;
        if (prevPost.title !== post.title) {
          window.dispatchEvent(new CustomEvent("update-tree"));
        }

        removeItem(postLocalSaveKey);

        this.setState({
          postId: post.id + "",
          post,
        });
      }, 1000);
    },
  });

  const subPostList = new SubPostList({
    $target: $page,
    initialState: [],
  });

  const setPost = async () => {
    const { postId } = this.state;

    if (postId !== "new") {
      const post = await fetchPost(postId);
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
    if (nextState.postId === "new") {
      const createdPost = await createPost();
      history.replaceState(null, null, `/posts/${createdPost.id}`);
      this.setState({
        postId: createdPost.id,
      });
      window.dispatchEvent(new CustomEvent("update-tree"));
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
      } else {
        setPost();
      }

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
    subPostList.setState(this.state.post.documents);
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
