import PostList from "./PostList.js";

export default function PostPage({ $target, initialState }) {
  // const $postPage = document.createElement("aside");
  const $postPage = document.createElement("div");
  $postPage.className = "sidebar";

  $target.appendChild($postPage);

  new PostList({ $target: $postPage, initialState });
}
