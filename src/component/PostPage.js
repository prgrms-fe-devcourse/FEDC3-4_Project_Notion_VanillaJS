import PostList from "./PostList.js";
import { request } from "../utils/api.js";
import LinkButton from "./LinkButton.js";
import { CheckNew } from "../utils/error.js";
import { setItem, removeItem } from "../utils/storage.js";
import { push } from "../utils/router.js";

export default function PostPage({ $target, initialState }) {
  CheckNew(new.target);

  const $postPage = document.createElement("div");
  $postPage.className = "PostPage";

  // CSS
  $postPage.style = `
    width: 20%;
    height: 100vh;
    background-color: #dcdcdc;
  `;

  this.setState = async (postId = null) => {
    const posts = await request("documents", {
      method: "GET",
    });

    postList.setState(posts, postId);

    // setState마다 render()를 진행하면 화면이 깜빡거리는 것처럼 보임.
  };

  new LinkButton({
    $target: $postPage,
    initialState: {
      text: "new Post",
      link: "/posts/new",
    },
  });

  const postList = new PostList({
    $target: $postPage,
    initialState,
    postAdd: async (id) => {
      const test = await request("documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: id,
        }),
      });

      // 하위 문서를 추가하면 자동으로 하위 문서 목록을 보이게 해준다.
      setItem(id, {
        id: id,
        visible: "",
      });

      push(`/posts/${test.id}`);
    },
    postDelete: async (id) => {
      const { pathname } = window.location;

      // 문서를 보고 있을 때 삭제.
      if (pathname.indexOf("/posts/") === 0) {
        const [, , postId] = pathname.split("/");

        if (id === postId) {
          if (confirm("현재 보고있는 문서를 삭제하시겠습니까?")) {
            await request(`documents/${id}`, {
              method: "DELETE",
            });

            removeItem(id);
            removeItem(`temp-post-${id}`);

            history.replaceState(null, null, "/");
            push("/");
          }
        } else {
          await request(`documents/${id}`, {
            method: "DELETE",
          });

          removeItem(id);
          removeItem(`temp-post-${id}`);

          history.replaceState(null, null, "/");

          // breadcrum을 갱신시키기 위헤서 현재 보고있는 문서로 재라우팅 시킨다.
          push(`/posts/${postId}`);
        }
        return;
      }
      // 문서를 보고 있지 않을 때 삭제
      await request(`documents/${id}`, {
        method: "DELETE",
      });

      removeItem(id);
      removeItem(`temp-post-${id}`);

      push("/");
    },
  });

  this.render = async () => {
    $target.appendChild($postPage);
  };

  this.render();
}
