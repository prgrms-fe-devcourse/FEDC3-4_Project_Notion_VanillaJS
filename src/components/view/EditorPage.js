import Editor from "../common/Editor.js";
import { request } from "../../js/api.js";
import { push } from "../../router/router.js";

export default function EditorPage({ $bodyPage, initialState }) {
  const $editorPage = document.createElement("div");
  $editorPage.classList.add("editor");

  $bodyPage.appendChild($editorPage);

  this.editorPageState = {
    editorData: initialState,
    documentIdData: [],
    documentTitleData: [],
  };

  const bringAllList = (list, type) => {
    const bringData = [];
    const stack = [list];

    while (stack.length > 0) {
      const nextList = stack.pop();

      if (nextList.documents) {
        for (let i = nextList.documents.length - 1; i >= 0; i--) {
          stack.push(nextList.documents[i]);
        }
      }

      if (type === "id") bringData.push(nextList.id);
      else bringData.push(nextList.title);
    }

    return bringData;
  };

  const bringData = async () => {
    const bringIdData = [];
    const bringTitleData = [];
    const documentListData = await request("/documents", { method: "GET" });
    documentListData.forEach((doc) => {
      bringIdData.push(...bringAllList(doc, "id"));
    });
    documentListData.forEach((doc) => {
      bringTitleData.push(...bringAllList(doc, "title"));
    });

    return [bringIdData, bringTitleData];
  };

  this.editorPageSetState = async (nextState) => {
    this.editorPageState.editorData = nextState;

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

      if (event !== null) {
        clearTimeout(event);
      }

      event = setTimeout(async () => {
        await request(`/documents/${pathId}`, {
          method: "PUT",
          body: JSON.stringify(editor.editorData),
        });
        push(`/documents/${pathId}`);
      }, 1000);
    },
  });

  this.sendData = async () => {
    if (this.editorPageState.editorData) {
      const { id } = this.editorPageState.editorData;

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
        editorData: { title: "not render" },
        documentIdData: [],
        documentTitleData: [],
      });
    }
  };
}
