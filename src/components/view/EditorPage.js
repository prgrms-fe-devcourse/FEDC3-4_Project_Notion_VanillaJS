import Editor from "../common/Editor.js";
import { request } from "../../js/api.js";

export default function EditorPage({ $bodyPage, initialState, onEdit }) {
  const $editorPage = document.createElement("div");
  $editorPage.classList.add("editor");

  $bodyPage.appendChild($editorPage);

  this.editorPageState = initialState;

  this.editorPageSetState = async (nextState) => {
    this.editorPageState = nextState;

    editor.editorSetState({
      editorData: this.editorPageState.editorData,
      documentIdData: this.editorPageState.documentIdData,
      documentTitleData: this.editorPageState.documentTitleData,
    });
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
}
