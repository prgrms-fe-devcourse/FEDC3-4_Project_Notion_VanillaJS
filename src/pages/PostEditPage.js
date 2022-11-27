import { request } from "../util/api.js";
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
      if (this.state.postId === "root") return;
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const { postId } = this.state;
        const isNew =
          typeof postId !== "number" && postId.substring(0, 3) === "new";
        if (isNew) {
          const parentId = postId.substring(4);

          let createdPost;
          if (parentId) {
            createdPost = await request("/documents", {
              method: "POST",
              body: JSON.stringify({
                ...post,
                parent: parentId,
              }),
            });
          } else {
            createdPost = await request("/documents", {
              method: "POST",
              body: JSON.stringify(post),
            });
          }
          onUpdateList();

          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            ...post,
            postId: createdPost.id,
          });
        } else {
          await request(`/documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
          onUpdateList();
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;

      this.state = nextState;

      const { postId } = this.state;
      const isNew =
        typeof postId !== "number" && postId.substring(0, 3) === "new";

      if (isNew) {
        const post = localPost();
        editor.setState(post);
      } else {
        await fetchPost();
      }
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

  this.render = () => {
    $target.appendChild($page);
    if (window.location.pathname === "/") $page.style.display = "none";
    else $page.style.display = "flex";
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== "new") {
      const post = await request(`/documents/${postId}`);

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
    }
  };

  this.render();
}
