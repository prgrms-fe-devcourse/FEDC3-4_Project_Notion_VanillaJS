import DocumentHeader from "./DocumentHeader.js";
import DocumentContent from "./DocumentContent.js";

import API from "../../utils/api.js";
import { USER } from "../../config.js";

export default function Document({
  $target,
  initialState = {
    documentId: null,
  },
}) {
  const renderNoDocument = ($container) => {
    $container.innerHTML = `<h1>🎉 Welcome to ${USER.NAME}'s Notion! 🎉</h1>`;
  };

  const renderNewDocument = ($header, $body) => {
    new DocumentHeader({
      $target: $header,
    });
    new DocumentContent({
      $target: $body,
    });
  };

  const renderExistDocument = async ($header, $body) => {
    const { documentId } = this.state;
    const { title, content } = await API.getDocuments(documentId);

    new DocumentHeader({
      $target: $header,
      initialState: { title },
    });
    new DocumentContent({
      $target: $body,
      initialState: { content },
    });
  };

  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <div id="document">
        <div id="document-header"></div>
        <div id="document-body"></div>
      </div>
    `;

    this.mounted();
  };

  this.mounted = async () => {
    const $container = this.$target.querySelector("#document");
    const $header = this.$target.querySelector("#document-header");
    const $body = this.$target.querySelector("#document-body");

    const { documentId } = this.state;

    if (!documentId) {
      renderNoDocument($container);
    } else if (documentId === "new") {
      renderNewDocument($header, $body);
    } else if (isNaN(documentId)) {
      renderExistDocument($header, $body);
    }
  };

  this.setEvent = () => {};

  this.init();
}
