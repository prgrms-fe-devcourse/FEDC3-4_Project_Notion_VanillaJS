import Editor from "./Editor.js";
import { getItem, setItem, removeItem } from "./Storage.js";
import { request } from "./Api.js";
import LinkButton from "./LinkButton.js";

export default function PostEditPage({ $target, initialState }) {
  const $postEditPage = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $postEditPage,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === "new";
        if (isNew) {
          const createPost = await request("documents", {
            method: "POST",
            body: JSON.stringify(post),
          });
          // 문서를 처음 생성할 때 title과 parent 들어가고 content는 받지않음.
          await request(`documents/${createPost.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });

          history.replaceState(null, null, `/posts/${createPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            postId: createPost.id,
          });
        } else {
          await request(`documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
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
    $target.appendChild($postEditPage);
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (this.state !== "new") {
      const post = await request(`documents/${postId}`, {
        metohd: "GET",
      });

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
        if (confirm("저장된 값이 있습니다.")) {
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
    $target: $postEditPage,
    initialState: {
      text: "목록으로 이동",
      link: "/",
    },
  });
}
