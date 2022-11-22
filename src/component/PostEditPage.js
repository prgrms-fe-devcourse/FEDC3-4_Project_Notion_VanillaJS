import { getItem, setItem, removeItem } from "../utils/storage.js";
import { request } from "../utils/api.js";
import { push, update } from "../utils/router.js";
import { CheckNew } from "../utils/error.js";
import Editor from "./Editor.js";
import LinkButton from "./LinkButton.js";
import Navi from "./Navi.js";

export default function PostEditPage({ $target, initialState }) {
  CheckNew(new.target);

  const $postEditPage = document.createElement("div");
  $postEditPage.className = "postEditPage";

  // CSS
  $postEditPage.style.width = "60%";
  $postEditPage.style.margin = "30px";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  let timer = null;

  const navi = new Navi({
    $target: $postEditPage,
    initialState: "new",
  });

  const editor = new Editor({
    $target: $postEditPage,
    initialState: {
      title: "제목없음",
      content: "",
    },
    onEditing: (post) => {
      setItem(postLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const isNew = this.state.postId === "new";
        if (isNew) {
          if (post.title === "") {
            alert("제목을 입력해주세요!");
            post.title = "제목 없음";
          }

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

          push(createPost.id);
        } else {
          if (post.title === "") {
            alert("제목을 입력해주세요!");
            post.title = "제목 없음";
          }

          await request(`documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });

          removeItem(postLocalSaveKey);

          // 의존성?
          navi.setState({
            ...post,
            postId: post.id,
          });
        }

        $loading.innerHTML = `${Date()}<h1>저장완료</h1>`;
        setTimeout(() => {
          $loading.innerHTML = ``;
        }, 3000);
        update(post.id);
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    // 새로운 게시물을 작성하다가 새로고침이 되어도 작성중인 내용이 사라지지않는다.
    if (this.state.postId === "new" && nextState.postId === "new") {
      const tempPost = await getItem(postLocalSaveKey, {
        title: "제목 없음",
        content: "",
      });

      if (tempPost.title !== "" || tempPost.content !== "") {
        this.state = {
          ...this.state,
          post: tempPost,
        };
      } else {
        this.state = nextState;
      }

      editor.setState(this.state.post);
      navi.setState(this.state);

      this.render();
      return;
    }

    if (this.state.postId !== nextState.postId) {
      // 지금 누른거로 바꿈.
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;

      // 새로운 문서를 만들 경우.
      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "제목 없음",
          content: "",
        });

        navi.setState(this.state);
        editor.setState(post);

        this.render();
      } else {
        // 이미 존재하는 문서일 경우.
        await fetchPost();
      }
      return;
    }

    // 진짜 페이지에 그리는건 여기 아래서 부터.
    this.state = nextState;

    navi.setState(this.state);

    this.render();
    if (this.state.post) {
      editor.setState(
        this.state.post || {
          title: "제목 없음",
          content: "",
        }
      );
    }
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (this.state !== "new") {
      const post = await request(`documents/${postId}`, {
        metohd: "GET",
      });

      // API에서 post를 받아올 때 글의 내용이 없으면 null로 내려온다.
      // ""과 null은 자료형이 일치 하지 않으므로 자료형을 일치 시켜준다.
      if (post.content === null) post.content = "";

      const tempPost = await getItem(postLocalSaveKey, {
        title: "제목 없음",
        content: "",
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
        if (
          confirm(
            `${tempPost.tempSaveDate
              .split("T")
              .map((item) => item.split("Z"))
              .join(" ")}에 작성된 글이 있습니다. 불러올까요?`
          )
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

  new LinkButton({
    $target: $postEditPage,
    initialState: {
      text: "보고 있는 글 닫기",
      link: "/",
    },
  });

  const $loading = document.createElement("div");
  $postEditPage.appendChild($loading);

  this.render = () => {
    $target.appendChild($postEditPage);
  };
}
