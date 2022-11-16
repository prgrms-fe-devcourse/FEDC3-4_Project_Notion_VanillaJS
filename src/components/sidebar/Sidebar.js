import SidebarFooter from "./SidebarFooter.js";
import SidebarSection from "./SidebarSection.js";
import API from "../../utils/api.js";

import { DEFAULT, USER } from "../../config.js";

export default function Sidebar({
  $target,
  initialState = {
    rootDocuments: [],
  },
}) {
  const addDocument = async (id = null) => {
    await API.createDocument(DEFAULT.DOCUMENT_NAME, id);
    const rootDocuments = await API.getDocuments();
    this.setState({ rootDocuments });
  };

  const deleteDocument = async (id) => {
    await API.deleteDocument(id);
    const rootDocuments = await API.getDocuments();
    this.setState({ rootDocuments });
  };

  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <div id="sidebar-header">
        <img class="profile" src="${USER.PROFILE_URL}" />
        <span>${USER.NAME}</span>
      </div>
      <div id="sidebar-section"></div>
      <div id="sidebar-footer"></div>
    `;
    this.mounted();
  };

  this.mounted = () => {
    const $section = this.$target.querySelector("#sidebar-section");
    const $footer = this.$target.querySelector("#sidebar-footer");

    new SidebarSection({
      $target: $section,
      initialState: {
        title: "Private",
        rootDocuments: [...this.state.rootDocuments],
      },
      onAddButtonClick: addDocument.bind(this),
      onDeleteButtonClick: deleteDocument.bind(this),
    });

    new SidebarFooter({
      $target: $footer,
      onAddButtonClick: addDocument.bind(this),
    });
  };

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.init();
}
