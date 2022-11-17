import DocumentHeader from "./DocumentHeader.js";
import DocumentContent from "./DocumentContent.js";

import API from "../../utils/api.js";
import { USER } from "../../config.js";
import { debounce } from "../../utils/debounce.js";
import { getItemFromStorage, setItemToStorage } from "../../utils/storage.js";

export default function Document({
  $target,
  initialState = {
    documentId: null,
  },
}) {
  const handleDocumentEdit = debounce(async (text, type = "title") => {
    const storedItem = getItemFromStorage("notion", { currentDocument: {} });

    storedItem.currentDocument = {
      ...storedItem.currentDocument,
      [type]: text,
      tempSavedAt: new Date(),
    };
    setItemToStorage("notion", { ...storedItem });
    await updateDocument(this.state.documentId, storedItem.currentDocument);
  }, 300);

  const fetchDocument = async (documentId) => {
    const response = await API.getDocuments(documentId);

    if (!response) {
      return [{ title: "", content: "" }, {}];
    }
    return [{ title: response.title, content: response.content }, response];
  };

  const updateDocument = async (documentId, newDocument) => {
    const { title, content } = newDocument;
    await API.updateDocument(documentId, { title, content });
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
      onEdit: handleDocumentEdit.bind(this),
    });
    new DocumentContent({
      $target: $body,
      initialState: { content },
      onEdit: handleDocumentEdit.bind(this),
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
    } else if (!!documentId) {
      console.log(documentId);
      renderDocumentById($header, $body);
    } else {
      renderNoDocument($container);
    }
  };

  this.setEvent = () => {};

  this.init();
}
