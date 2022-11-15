import Editor from "./Editor.js";
import { getItem, setItem, removeItem } from "./Storage.js";
import { request } from "./Api.js";
import LinkButton from "./LinkButton.js";
import { CheckNew } from "./Error.js";
import Navi from "./Navi.js";

export default function PostEditPage({ $target, initialState, listUpdate }) {
  CheckNew(new.target);

  const $postEditPage = document.createElement("div");
  $postEditPage.className = "postEditPage";

  $postEditPage.style.width = "60%";
  $postEditPage.style.margin = "30px";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  // const post = getItem(postLocalSaveKey, {
  //   title: "",
  //   content: "",
  // });

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

      const $loading = document.createElement("div");
      $postEditPage.appendChild($loading);

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

          listUpdate();
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

          listUpdate();
        }

        $loading.innerHTML = `<p>저장완료</p>`;
        setTimeout(() => {
          $loading.innerHTML = ``;
        }, 3000);
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    //console.log(this.state, nextState);

    // 새로운 게시물을 작성하다가 새로고침이 되어도 작성중인 내용이 사라지지않는다.
    if (this.state.postId === "new" && nextState.postId === "new") {
      const tempPost = await getItem(postLocalSaveKey, {
        title: "",
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
          title: "새 문서의 제목을 입력하세요.",
          content: "",
        });

        navi.setState(this.state);

        this.render();
        editor.setState(post);
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
          title: "새 문서의 제목을 입력하세요.",
          content: "",
        }
      );
    }
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

      const tempPost = await getItem(postLocalSaveKey, {
        title: "",
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
}
