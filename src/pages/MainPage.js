import Sidebar from "../components/sidebar/Sidebar.js";
import Document from "../components/document/Document.js";

import API from "../utils/api.js";

export default function MainPage({
  $target,
  initialState = {
    documentId: null,
  },
}) {
  this.renderSidebar = async () => {
    const $sidebar = this.$target.querySelector("#sidebar");
    const response = await API.getDocuments();

    new Sidebar({
      $target: $sidebar,
      initialState: {
        rootDocuments: response,
      },
    });
  };

  this.renderDocument = () => {
    const $container = this.$target.querySelector("#document-container");

    new Document({
      $target: $container,
      initialState: {
        documentId: this.state.documentId,
      },
    });
  };

  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <aside id="sidebar"></aside>
      <main id="document-container"></main>
    `;

    this.mounted();
  };

  this.mounted = async () => {
    await this.renderSidebar();
    this.renderDocument();
  };

  this.setState = (newState) => {
    const { documentId } = newState;
    const isDocumentChanged = documentId && documentId !== this.state.documentId;

    if (isDocumentChanged) {
      this.state = { ...this.state, ...newState };
      this.renderDocument();
      return;
    }

    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.init();
}
