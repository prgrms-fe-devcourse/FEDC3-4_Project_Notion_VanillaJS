import Editor from "./Editor.js";

export default function EditorPage({ $target, initialState }) {
  const $page = document.createElement("div");
  new Editor({
    $target: $page,
    initialState,
    onEditing: () => {},
  });

  this.render = () => {
    $target.appendChild($page);
  };

  this.render();
}
