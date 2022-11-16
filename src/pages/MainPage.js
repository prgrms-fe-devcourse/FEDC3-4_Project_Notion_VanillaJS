import Sidebar from "../components/sidebar/Sidebar.js";
import Document from "../components/document/Document.js";

import API from "../utils/api.js";

export default function MainPage({ $target }) {
  const renderSidebar = async ($sidebar) => {
    const response = await API.getDocuments();

    new Sidebar({
      $target: $sidebar,
      initialState: {
        rootDocuments: response,
      },
    });
  };

  const renderDocument = ($documentContaier) => {
    new Document({
      $target: $documentContaier,
    });
  };

  this.$target = $target;

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
    const $sidebar = this.$target.querySelector("#sidebar");
    const $container = this.$target.querySelector("#document-container");

    renderSidebar($sidebar);
    renderDocument($container);
  };

  this.init();
}
