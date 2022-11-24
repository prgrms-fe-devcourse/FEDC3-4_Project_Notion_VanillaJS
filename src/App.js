import { request } from "./api.js";
import EditPage from "./components/EditPage.js";
import Sidebar from "./components/Sidebar.js";
import { initRouter, push } from "./router.js";

export default function App({ $target }) {
  const $sidebarContainer = document.createElement("div");
  $sidebarContainer.className = "sidebar-container";

  const $editorContainer = document.createElement("div");
  $editorContainer.className = "editor-container";

  $target.appendChild($sidebarContainer);
  $target.appendChild($editorContainer);

  this.state = {
    documents: [],
    editor: null,
  };

  this.setState = (nextState) => {
    if (!Array.isArray(nextState.document)) {
      this.state = nextState;
    }
  };

  const sideBar = new Sidebar({
    $target: $sidebarContainer,
  });

  const editPage = new EditPage({
    $target: $editorContainer,
    initialState: this.state,
    getTitleChange: () => {
      sideBar.setState(this.state.documents);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    const documentList = await request("/");
    this.setState({ documents: documentList });

    if (pathname === "/") {
      $editorContainer.style.display = "none";
      sideBar.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      $editorContainer.style.display = "block";
      const [, , id] = pathname.split("/");
      if (id === "undefined") {
        push("/");
        return;
      }
      const editor = await request(`/${id}`);
      console.log(editor);
      this.setState({ ...this.state, editor: editor });
      editPage.setState(this.state.editor);
    }
  };

  this.route();

  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
