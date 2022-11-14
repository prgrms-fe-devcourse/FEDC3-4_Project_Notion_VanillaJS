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

          listUpdate();
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    //console.log(this.state, nextState);

    // 첫 게시물 작성시 <-- 수정필요.
    if (this.state.postId === "new" && nextState.postId === "new") {
      this.state = nextState;
      editor.setState({
        title: "오늘의 첫번째 게시글을 작성해보세요.",
        content: "새 문서의 내용을 입력하세요.",
      });
      this.render();
      return;
    }

    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`; // 지금 누른거로 바꿈.
      this.state = nextState;

      // 새로운 문서를 만들 경우.
      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "새 문서의 제목을 입력하세요.",
          content: "문서의 내용을 변경하면 문서가 생성되고 저장됩니다.",
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
