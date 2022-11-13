import Editor from "../common/Editor.js";
import { request } from "../../js/api.js";
import { push } from "../../router/router.js";

export default function EditorPage({ $bodyPage, initialState }) {
  const $editorPage = document.createElement("div");
  $editorPage.style.width = "700px";

  $bodyPage.appendChild($editorPage);

  this.editorPageState = initialState;

  this.editorPageSetState = (nextState) => {
    this.editorPageState = nextState;
    this.sendData();
  };

  let event = null;
  const editor = new Editor({
    $editorPageTarget: $editorPage,
    initialState,
    onEditing: (editor) => {
      const { pathname } = location;
      const [, , pathId] = pathname.split("/");

      if (event !== null) {
        clearTimeout(event);
      }

      event = setTimeout(async () => {
        await request(`/documents/${pathId}`, {
          method: "PUT",
          body: JSON.stringify(editor),
        });
        push(`/documents/${pathId}`);
      }, 1000);
    },
  });

  this.sendData = async () => {
    if (this.editorPageState) {
      const { id } = this.editorPageState;

      const serverData = await request(`/documents/${id}`, { method: "GET" });
      editor.editorSetState(serverData);
    } else {
      // by 민형, remove하고 index 왔을 때 Editor 지워져야 함_221113
      // Editor에 setState를 통해 render
      // Editor는 render시에 tex가 not render라면 화면을 지움
      editor.editorSetState({
        title: "not render",
      });
    }
  };
}
