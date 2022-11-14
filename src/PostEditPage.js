import { request } from "./api.js";
import Editor from "./Editor.js";
import { getItem, removeItem, setItem } from "./storage.js";

export default function PostEditPage({ $target, initialState, listUpdate }) {
  const $page = document.createElement("div");
  $page.className = "editPage";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;
  let serveTimer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      if (serveTimer !== null) {
        clearTimeout(serveTimer);
      }

      timer = setTimeout(async () => {
        console.log(1000);
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });
      }, 1000);

      serveTimer = setTimeout(async () => {
        //나중에 함수로 빼기
        const isNew = this.state.postId === "new";
        if (isNew) {
          const newPost = await request(`/documents`, {
            method: "POST",
            body: JSON.stringify(post),
          });

          history.replaceState(null, null, `/documents/${newPost.id}`);

          this.setState({
            postId: newPost.id,
          });
        } else {
          await request(`/documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });

          removeItem(postLocalSaveKey);
          listUpdate();
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
        //서버에서 값을 가져오는 함수 실행
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

  const fetchPost = async () => {
    const { postId } = this.state;
    if (postId !== "new") {
      const post = await request(`/documents/${postId}`);

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
        if (
          confirm("저장되지 않은 임시 데이터가 있습니다. 불러오시겠습니까?")
        ) {
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

  this.render = () => {
    $target.appendChild($page);
  };
}
