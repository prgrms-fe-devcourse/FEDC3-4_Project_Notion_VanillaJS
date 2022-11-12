import PostList from "./PostList.js";
import { request } from "./Api.js";
import LinkButton from "./LinkButton.js";

export default function PostPage({ $target, initialState }) {
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
      await request("documents", {
        method: "POST",
        body: JSON.stringify({
          title: "새 문서",
          parent: id,
        }),
      });
    },
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

    //this.render();
  };

  this.render = async () => {
    //$target.appendChild($postPage);
  };

  console.log("왜 안붙지");
  $target.appendChild($postPage);
}
