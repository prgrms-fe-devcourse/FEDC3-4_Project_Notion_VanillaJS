import DocumentHeader from "./DocumentHeader.js";
import Editor from "./DocumentEditor.js";

import { modifyDocuments } from "../../api/api.js";

import { validateInstance } from "../../utils/validation.js";
import { debounce } from "../../utils/debounce.js";

export default function Document({ $target, initialState, onUpdateTitle }) {
  validateInstance(new.target);

  const $document = document.createElement("div");
  $document.classList.add("document");

  this.state = initialState;

  new DocumentHeader({ $target: $document });

  const editor = new Editor({
    $target: $document,
    initialState,
    onEditTitle: (id, data) => {
      debounce(async () => {
        await modifyDocuments(id, data);
        onUpdateTitle();
      }, 100);
    },
    onEditContent: (id, data) => {
      debounce(async () => {
        await modifyDocuments(id, data);
      }, 300);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(this.state);

    this.render();
  };

  this.render = () => {
    $target.appendChild($document);
  };
}
