import PostPage from "./components/PostPage.js";

export default function App({ $target, initialState }) {
  const $notion = document.createElement("div");
  $notion.className = "notion-container";

  $target.appendChild($notion);

  new PostPage({ $target: $notion, initialState });
}
