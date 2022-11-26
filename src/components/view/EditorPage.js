import Editor from "../common/Editor.js";
import { request } from "../../js/api.js";
import { bringData } from "../../js/bringAllData.js";

export default function EditorPage({ $bodyPage, initialState, onEdit }) {
  const $editorPage = document.createElement("div");
  $editorPage.classList.add("editor");

  $bodyPage.appendChild($editorPage);

  this.editorPageState = {
    editorData: initialState,
    documentIdData: [],
    documentTitleData: [],
  };

  this.editorPageSetState = async (nextState) => {
    this.editorPageState.editorData = nextState;

    // by 민형, 동일 document check 구현을 위한 작업_221116
    const bringAllData = await bringData();
    this.editorPageState.documentIdData = bringAllData[0];
    this.editorPageState.documentTitleData = bringAllData[1];

    this.sendData();
  };

  let event = null;
  const editor = new Editor({
    $editorPageTarget: $editorPage,
    initialState,
    onEditing: (editor) => {
      const { pathname } = location;
      const [, , pathId] = pathname.split("/");

      onEdit(editor.editorData);
      if (event !== null) {
        clearTimeout(event);
      }

      event = setTimeout(async () => {
        await request(`/documents/${pathId}`, {
          method: "PUT",
          body: JSON.stringify(editor.editorData),
        });
      }, 2000);
    },
  });

  this.sendData = async () => {
    const { id } = this.editorPageState.editorData;
    if (id) {
      const serverData = await request(`/documents/${id}`, { method: "GET" });

      editor.editorSetState({
        editorData: serverData,
        documentIdData: this.editorPageState.documentIdData,
        documentTitleData: this.editorPageState.documentTitleData,
      });
    } else {
      // by 민형, remove하고 index 왔을 때 Editor 지워져야 함_221113
      // Editor에 setState를 통해 render
      // Editor는 render시에 tex가 not render라면 화면을 지움
      editor.editorSetState({
        editorData: { id: 0, title: "not render" },
        documentIdData: [],
        documentTitleData: [],
      });
    }
  };
}
