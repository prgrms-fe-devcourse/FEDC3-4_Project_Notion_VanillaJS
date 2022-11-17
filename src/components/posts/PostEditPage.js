import { request } from "../../utils/api.js";
import { getItem, removeItem, setItem } from "../../utils/storage.js";
import Editor from "./Editor.js";

export default function PostEditPage({ $target, initialState }) {
  const $postEditPage = document.createElement("div");
  $postEditPage.className = "post-edit-page";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $postEditPage,
    initialState: post,

    onEditing: (post) => {
      /* 연속으로 입력을 하고 있을 때는 계속 이벤트 발생을 지연시키다가
       입력을 멈췄을 때, 즉, 마지막으로 이벤트가 발생하고 일정 시간이 지났을 때
       지연시켰던 이벤트를 실행시키는 것 - 디바운스
       디바운스를 이용하면 이벤트 발생하는 횟수를 줄일 수 있다. -> 성능, 최적화
    */
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
          const createdPost = await request("/documents", {
            method: "POST",
            body: JSON.stringify(post),
          });
          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            postId: createdPost.id,
          });
        } else {
          await request(`/documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 1000);
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

    if (postId !== "new") {
      const post = await request(`/documents/${[postId]}`);

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
}
