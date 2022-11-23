import Details from "./Details.js";

import { navigate } from "../../utils/navigate.js";
import { addEvent, handlers } from "../../utils/event.js";
import { findDocumentElement, createRootDocumentsElement } from "../../utils/helper.js";

export default function SidebarBody({
  $target,
  initialState = {
    title: "",
    rootDocuments: [],
  },
  onAddButtonClick,
  onDeleteButtonClick,
}) {
  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.setEvent();
    this.render();
  };

  this.render = () => {
    const { title, rootDocuments } = this.state;

    this.$target.innerHTML = `
      <span class="section-title">${title}</span>
      ${createRootDocumentsElement(rootDocuments)}
    `;

    this.mounted();
  };

  this.mounted = () => {
    const { rootDocuments } = this.state;

    rootDocuments.forEach((document) => {
      const $target = findDocumentElement(document.id);
      if ($target) {
        new Details({
          $target,
          initialState: { ...document },
        });
      }
    });
  };

  this.setEvent = () => {
    const {
      handleDocumentItemMouseOver,
      handleDocumentItemMouseOut,
      handleArrowButtonClick,
      handleDocumentItemClick,
    } = handlers;

    addEvent(this.$target, "mouseover", "#document-item", handleDocumentItemMouseOver);
    addEvent(this.$target, "mouseout", "#document-item", handleDocumentItemMouseOut);

    addEvent(this.$target, "click", ".arrow", handleArrowButtonClick);
    addEvent(this.$target, "click", ".add-btn", (event) => {
      const { documentId } = event.target.closest("#document-item").dataset;
      onAddButtonClick(documentId);
    });
    addEvent(this.$target, "click", ".trash", (event) => {
      const { documentId } = event.target.closest("#document-item").dataset;
      onDeleteButtonClick(documentId);
    });

    addEvent(this.$target, "click", "#document-item", (event) => {
      if (!handleDocumentItemClick(event)) {
        return;
      }

      const { documentId } = event.target.closest("#document-item").dataset;
      navigate(`/documents/${documentId}`, false, { documentId });
    });
  };

  this.init();
}
