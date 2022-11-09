import Editor from "./Editor.js";

export default function EditorPage({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  const post = {
    title: "",
    content: "",
  };

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {},
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
