import { request } from "./api.js";
import EditPage from "./components/EditPage.js";
import PostPage from "./components/Sidebar.js";
import { initRouter } from "./router.js";
import { push } from "./router.js";

export default function App({ $target }) {
  const $sidebarContainer = document.createElement("div");
  $sidebarContainer.className = "sidebarContainer";

  const $editorContainer = document.createElement("div");
  $editorContainer.className = "editor-container";

  $target.appendChild($sidebarContainer);
  $target.appendChild($editorContainer);

  this.state = {
    documents: [],
    editor: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const postPage = new PostPage({
    $target: $sidebarContainer,
    getSelectedId: (id) => {},
  });

  const editPage = new EditPage({
    $target: $editorContainer,
    initialState: this.state,
    getTitleChange: () => {
      postPage.setState(this.state.documents);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    const documentList = await request("/");
    this.setState({ documents: documentList });

    if (pathname === "/") {
      $editorContainer.style.display = "none";
      postPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      $editorContainer.style.display = "block";
      const [, , id] = pathname.split("/");
      if (id === "undefined") {
        push("/");
        return;
      }
      const editor = await request(`/${id}`);
      this.setState({ ...this.state, editor: editor });
      editPage.setState(this.state.editor);
    }
  };

  this.route();

  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
