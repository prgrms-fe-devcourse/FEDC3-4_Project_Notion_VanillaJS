import DocumentListPage from "./components/view/DocumentListPage.js";
import EditorPage from "./components/view/EditorPage.js";
import { initRouter } from "./router/router.js";
import { request } from "./js/api.js";
import { NOT_RENDER } from "./js/constants.js";
import { bringData } from "./js/bringAllData.js";

export default function App({ $bodyPage, initalState }) {
  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const documentListPage = new DocumentListPage({
    $bodyPage,
    initialState: {
      originEdit: [],
      updateEdit: {},
    },
  });

  const editorPage = new EditorPage({
    $bodyPage,
    initialState: {
      editorData: { id: 0, title: NOT_RENDER },
      documentIdData: [],
      documentTitleData: [],
    },
    onEdit: (currentEdit) => {
      if (currentEdit) {
        this.setState({ ...currentEdit });
        this.router();
      }
    },
  });

  const getListData = async () => {
    return await request("/documents", { method: "GET" });
  };
  const getEditData = async (id) => {
    return await request(`/documents/${id}`, { method: "GET" });
  };

  this.router = async () => {
    const { pathname } = location;
    const getedListData = await getListData();

    if (pathname === "/") {
      documentListPage.documentListSetState({
        originEdit: getedListData,
        updateEdit: undefined,
      });
      editorPage.editorPageSetState({
        editorData: { id: 0, title: NOT_RENDER },
        documentIdData: [],
        documentTitleData: [],
      });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      const getedEditData = await getEditData(id);
      const bringAllData = await bringData();

      // by 민형, 여러 가지 경우_221115
      // 1. 새로고침 했을 경우 2. 수정 중인 경우, 3. 수정 후 다른페이지로 이동하는 경우
      if (!this.state) {
        // 1
        documentListPage.documentListSetState({
          originEdit: getedListData,
          updateEdit: undefined,
        });
        editorPage.editorPageSetState({
          editorData: getedEditData,
          documentIdData: bringAllData[0],
          documentTitleData: bringAllData[1],
        });
      } else {
        // 2
        documentListPage.documentListSetState({
          originEdit: getedListData,
          updateEdit: this.state,
        });

        if (this.state.id === parseInt(id)) return;
        // 3(by 민형, 다른 페이지로 이동 시 기존의 state 제거_221116)
        editorPage.editorPageSetState({
          editorData: getedEditData,
          documentIdData: bringAllData[0],
          documentTitleData: bringAllData[1],
        });
        this.setState(undefined);
      }
    }
  };

  this.router();

  initRouter(this.router);
}
