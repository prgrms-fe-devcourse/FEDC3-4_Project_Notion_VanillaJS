import Editor from "../common/Editor.js";
import { request } from "../../js/api.js";

export default function EditorPage({ $bodyPage, initialState }) {
  const $editorPage = document.createElement("div");

  $bodyPage.appendChild($editorPage);

  this.editorPageState = initialState;

  this.editorPageSetState = (nextState) => {
    this.editorPageState = nextState;
    this.sendData();
  };

  const editor = new Editor({
    $editorPageTarget: $editorPage,
    initialState,
  });

  this.sendData = async () => {
    const { id } = this.editorPageState;
    const serverData = await request(`/documents/${id}`, { method: "GET" });

    editor.editorSetState(serverData);
  };
}
