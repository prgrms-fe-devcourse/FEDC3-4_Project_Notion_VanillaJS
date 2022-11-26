import DocumentListPage from "./components/view/DocumentListPage.js";
import EditorPage from "./components/view/EditorPage.js";
import { initRouter } from "./router/router.js";

export default function App({ $bodyPage, initalState }) {
  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const documentListPage = new DocumentListPage({
    $bodyPage,
  });

  const editorPage = new EditorPage({
    $bodyPage,
    onEdit: (currentEdit) => {
      if (currentEdit) {
        this.setState({ ...currentEdit });
        this.router();
      }
    },
  });

  this.router = () => {
    const { pathname } = location;

    if (pathname === "/") {
      documentListPage.documentListSetState();
      editorPage.editorPageSetState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");

      // by 민형, 여러 가지 경우_221115
      // 1. 새로고침 했을 경우 2. 수정 중인 경우, 3. 수정 후 다른페이지로 이동하는 경우
      if (!this.state) {
        // 1
        documentListPage.documentListSetState();
        editorPage.editorPageSetState({ id });
      } else {
        // 2
        documentListPage.documentListSetState(this.state);
        if (this.state.id !== parseInt(id)) {
          // 3
          editorPage.editorPageSetState({ id });
          // by 민형, 다른 페이지로 이동 시 기존의 state 제거_221116
          this.setState();
        }
      }
    }
  };

  this.router();

  initRouter(this.router);
}
