import Details from "./Details.js";

import { addEvent, handlers } from "../../utils/event.js";
import { findDocumentElement } from "../../utils/selector.js";

import { $rootDocuments } from "../../utils/templates.js";

export default function SidebarSection({
  $target,
  initialState = {
    title: "",
    rootDocuments: [],
  },
  onAddButtonClick,
  onDeleteButtonClick,
}) {
  this.$target = $target;
  this.state = { ...initialState };

  this.init = () => {
    this.setEvent();
    this.render();
  };

  this.render = () => {
    const { title, rootDocuments } = this.state;

    this.$target.innerHTML = `
      <span class="section-title">${title}</span>
      ${$rootDocuments(rootDocuments)}
    `;

    this.mounted();
  };

  this.mounted = () => {
    const { rootDocuments } = this.state;

    rootDocuments.forEach((document) => {
      new Details({
        $target: findDocumentElement(document.id),
        initialState: { ...document },
      });
    });
  };

  this.setEvent = () => {
    const { onDocumentItemMouseOver, onDocumentItemMouseOut } = handlers;

    addEvent(this.$target, "mouseover", "#document-item", onDocumentItemMouseOver);
    addEvent(this.$target, "mouseout", "#document-item", onDocumentItemMouseOut);
    addEvent(this.$target, "click", ".add-btn", (event) => {
      const { documentId } = event.target.closest("#document-item").dataset;
      onAddButtonClick(documentId);
    });
    addEvent(this.$target, "click", ".trash", (event) => {
      const { documentId } = event.target.closest("#document-item").dataset;
      onDeleteButtonClick(documentId);
    });
  };

  this.init();
}
