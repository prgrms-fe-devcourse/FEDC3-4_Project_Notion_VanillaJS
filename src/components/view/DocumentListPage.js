import DocumentList from "../common/DocumentList.js";
import { request } from "../../js/api.js";

export default function DocumentListPage({ $bodyPage, initialState }) {
  const $documentListPage = document.createElement("div");

  $bodyPage.appendChild($documentListPage);

  this.documentListState = initialState;

  this.documentListSetState = (nextState) => {
    this.documentListState = nextState;
    this.render();
  };

  const init = async () => {
    const serverData = await request("/documents", { method: "GET" });

    new DocumentList({
      $documentListPage,
      initialState: serverData,
    });
  };

  init();
}
