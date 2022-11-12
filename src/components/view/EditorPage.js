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
    if (this.editorPageState) {
      const { id } = this.editorPageState;
      const serverData = await request(`/documents/${id}`, { method: "GET" });
      editor.editorSetState(serverData);
    } else {
      // by 민형, remove하고 index 왔을 때 Editor 지워져야 함_221113
      // Editor에 setState를 통해 render
      // Editor는 render시에 받은 데이터가 없다면 화면을 지움
      editor.editorSetState();
    }
  };
}
