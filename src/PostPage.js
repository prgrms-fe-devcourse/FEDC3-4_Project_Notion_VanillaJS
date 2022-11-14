import PostList from "./PostList.js";
import { request } from "./Api.js";
import LinkButton from "./LinkButton.js";
import { CheckNew } from "./Error.js";
import { removeItem } from "./Storage.js";
import { push } from "./router.js";

export default function PostPage({ $target, initialState }) {
  CheckNew(new.target);

  const $postPage = document.createElement("div");
  $postPage.className = "PostPage";

  $postPage.style.width = "30%";
  $postPage.style.height = "100vh";
  $postPage.style.backgroundColor = "#dcdcdc";

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
          title: "새 문서",
          parent: id,
        }),
      });

      push(`/posts/${test.id}`);
    },
    postDelete: async (id) => {
      const { pathname } = window.location;
      if (pathname.indexOf("/posts/") === 0) {
        const [, , postId] = pathname.split("/");
        if (id === postId) {
          if (confirm("현재 보고있는 문서를 삭제하시겠습니까?")) {
            // home으로 라우팅.
            alert("현재 문서가 삭제되었습니다.");
            push("/");
          }
        }
      }

      await request(`documents/${id}`, {
        method: "DELETE",
      });

      removeItem(id);

      const nextState = await request("documents", {
        method: "GET",
      });
      postList.setState(nextState);
    },
  });

  this.setState = async () => {
    const posts = await request("documents", {
      method: "GET",
    });
    postList.setState(posts);

    // setState마다 render()를 진행하면 화면이 깜빡거리는 것처럼 보임.
    //this.render();
  };

  this.render = async () => {
    $target.appendChild($postPage);
  };

  this.render();
  //$target.appendChild($postPage);
}
