import DocumentHeader from "./DocumentHeader.js";
import DocumentContent from "./DocumentContent.js";

import API from "../../utils/api.js";
import { setItemToStorage, getItemFromStorage } from "../../utils/storage.js";
import { debounce } from "../../utils/index.js";
import { navigate } from "../../utils/navigate.js";

export default function Document({
  $target,
  initialState = {
    documentId: null,
  },
}) {
  const fetchDocument = async (documentId) => {
    const response = await API.getDocuments(documentId);

    if (!response) {
      navigate("/", true);
      return;
    }

    return [{ title: response.title, content: response.content }, response];
  };

  const handleDocumentEdit = async (text, section = "title") => {
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

  const renderDocumentById = async ($header, $body) => {
    const { documentId } = this.state;
    const [{ title, content }, response] = await fetchDocument(documentId);

    setItemToStorage("notion", { currentDocument: response });

    new DocumentHeader({
      $target: $header,
      initialState: { title },
      onEdit: debounce(handleDocumentEdit, 300),
    });
    new DocumentContent({
      $target: $body,
      initialState: { content },
      onEdit: debounce(handleDocumentEdit, 300),
    });
  };

  const renderNewDocument = ($header, $body) => {
    new DocumentHeader({ $target: $header, onEdit: debounce(handleDocumentEdit, 300) });
    new DocumentContent({ $target: $body, onEdit: debounce(handleDocumentEdit, 300) });
  };

  const renderNoDocument = ($container) => {
    $container.innerHTML = `
      <h1 style="color: rgb(102, 75, 63, 0.7); font-weight: 800;">Notion에 오신 것을 환영해요!</h1>
      <img src="https://media3.giphy.com/media/KjuQizGwJCsgoYdziS/giphy.gif?cid=ecf05e47ly3czt6iu86gd916h6oqna0t6wnb0e95ldri599i&rid=giphy.gif&ct=s" />
    `;
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
      renderDocumentById($header, $body);
    } else {
      renderNoDocument($container);
    }
  };

  this.init();
}
