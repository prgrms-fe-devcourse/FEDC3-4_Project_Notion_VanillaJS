import EditorPage from "./EditorPage.js";
import { request } from "../../api/request.js";

export default function EditorContainer({ $target }) {
  const $editorContainer = document.createElement("main");
  $editorContainer.className = "editor-container";

  const $ediotr = new EditorPage({
    $target: $editorContainer,
  });

  this.setState = async (selectedDoc) => {
    const id = selectedDoc?.id;
    if (!id) {
      $ediotr.setState({ title: "", content: "" });
    } else {
      const doc = await request(`/documents/${id}`);
      $ediotr.setState(doc);
    }
  };

  this.render = () => {
    $target.appendChild($editorContainer);
  };
}
