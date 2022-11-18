import DocumentHeader from "./DocumentHeader.js";
import DocumentContent from "./DocumentContent.js";

import API from "../../utils/api.js";
import { USER } from "../../config.js";
import { debounce } from "../../utils/index.js";
import { setItemToStorage, getItemFromStorage } from "../../utils/storage.js";
import { handlers } from "../../utils/event.js";
import { navigate } from "../../utils/navigate.js";

export default function Document({
  $target,
  initialState = {
    documentId: null,
  },
}) {
  const handleDocumentEdit = async (text, section = "title") => {
    console.log(this);
    const storedItem = getItemFromStorage("notion", { currentDocument: {} });

    storedItem.currentDocument = {
      ...storedItem.currentDocument,
      [section]: text,
      tempSavedAt: new Date(),
    };
    setItemToStorage("notion", { ...storedItem });

    const { title, content } = storedItem.currentDocument;
    await API.updateDocument(this.state.documentId, { title, content });
  };

  const fetchDocument = async (documentId) => {
    const response = await API.getDocuments(documentId);
    if (!response) {
      navigate("/", true);
      return;
    }

    return [{ title: response.title, content: response.content }, response];
  };

  const renderNoDocument = ($container) => {
    $container.innerHTML = `<h1>🎉 Welcome to ${USER.NAME}'s Notion! 🎉</h1>`;
  };

  const renderNewDocument = ($header, $body) => {
    new DocumentHeader({ $target: $header, onEdit: handleDocumentEdit.bind(this) });
    new DocumentContent({ $target: $body, onEdit: handleDocumentEdit.bind(this) });
  };

  const renderDocumentById = async ($header, $body) => {
    const { documentId } = this.state;
    const [{ title, content }, response] = await fetchDocument(documentId);
    setItemToStorage("notion", { currentDocument: response });

    new DocumentHeader({
      $target: $header,
      initialState: { title },
      onEdit: debounce(handleDocumentEdit.bind(this), 300),
    });
    new DocumentContent({
      $target: $body,
      initialState: { content },
      onEdit: debounce(handleDocumentEdit.bind(this), 300),
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

    if (documentId === "new") {
      renderNewDocument($header, $body);
      return;
    } else if (!!documentId) {
      console.log(documentId);
      renderDocumentById($header, $body);
    } else {
      console.log(documentId);
      renderNoDocument($container);
    }
  };

  this.setEvent = () => {};

  this.init();
}
