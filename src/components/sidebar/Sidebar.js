import SidebarFooter from "./SidebarFooter.js";
import SidebarBody from "./SidebarBody.js";
import API from "../../utils/api.js";

import { DEFAULT, USER } from "../../config.js";
import { navigate } from "../../utils/navigate.js";

export default function Sidebar({
  $target,
  initialState = {
    rootDocuments: [],
  },
}) {
  const addDocument = async (parentId = null) => {
    const { id } = await API.createDocument(DEFAULT.DOCUMENT_NAME, parentId);
    navigate(`/documents/${id}`);
  };

  const deleteDocument = async (id) => {
    await API.deleteDocument(id);
    const rootDocuments = await API.getDocuments();
    // console.log(id, rootDocuments);
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

    new SidebarBody({
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
