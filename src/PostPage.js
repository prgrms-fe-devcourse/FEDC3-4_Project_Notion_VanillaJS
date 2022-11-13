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
    // 로컬스토리지도 비워야함.
    postDelete: async (id) => {
      await request(`documents/${id}`, {
        method: "DELETE",
      });

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
