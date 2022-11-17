import Details from "./Details.js";

import { addEvent, handlers } from "../../utils/event.js";
import { findDocumentElement } from "../../utils/selector.js";

import { $rootDocuments } from "../../utils/templates.js";
import { navigate } from "../../utils/navigate.js";

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
      ${$rootDocuments(rootDocuments)}
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

    addEvent(this.$target, "click", "#document-item", (event) => {
      event.preventDefault();

      if (
        event.target.closest(".nopage") ||
        event.target.closest(".add-btn") ||
        event.target.closest(".trash")
      ) {
        return;
      }
      if (event.target.closest(".arrow")) {
        event.target.closest("details").open = !event.target.closest("details").open;
        return;
      }

      const { documentId } = event.target.closest("#document-item").dataset;
      navigate(`/documents/${documentId}`);
      return;
    });
  };

  this.init();
}
