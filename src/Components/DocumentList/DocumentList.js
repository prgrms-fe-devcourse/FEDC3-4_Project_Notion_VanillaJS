import { isConstructor } from "../../Helpers/checkError.js";
import DocumentDetailedList from "./DocumentDetailedList.js";

export default function DocumentList({
  $target,
  initialState,
  postDocument,
  deleteDocument,
  showChildDocument,
  hideChildDocument,
}) {
  isConstructor(new.target);
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);
  const documentDetailedList = new DocumentDetailedList({
    $target: $documentList,
    initialState,
  });

  this.setState = async (nextState) => {
    documentDetailedList.setState(nextState);
  };

  $target.addEventListener("click", (e) => {
    if (e.target && e.target.id === "postDocumentButton") {
      postDocument({ $target: e.target });
    }

    if (e.target && e.target.id === "deleteDocumentButton") {
      deleteDocument({ $target: e.target });
    }

    if (e.target && e.target.id === "showChildDocumentButton") {
      showChildDocument({ $target: e.target });
    }

    if (e.target && e.target.id === "hideChildDocumentButton") {
      hideChildDocument({ $target: e.target });
    }
  });
}
