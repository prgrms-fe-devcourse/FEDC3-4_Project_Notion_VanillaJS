import DocumentList from "../common/DocumentList.js";
import { request } from "../../js/api.js";
import { push } from "../../router/router.js";

export default function DocumentListPage({ $bodyPage, initialState }) {
  const $documentListPage = document.createElement("div");

  this.documentListState = initialState;

  this.documentListSetState = (nextState) => {
    this.documentListState = nextState;
    this.sendData();
    this.render();
  };

  const documentList = new DocumentList({
    $documentListPage,
    initialState: this.documentListState,
    onPlus: async (id) => {
      const res = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: id,
        }),
      });
      console.log("plus");
      push(`/documents/${res.id}`);
    },
    onRemove: async (id) => {
      const removeDocument = await request(`/documents/${id}`, {
        method: "GET",
      });
      const stack = [removeDocument];

      while (stack.length > 0) {
        const currentDocument = stack.pop();

        // by 민형, 현재 document의 자식 document가 있다면 stack에 추가_221113
        if (currentDocument.documents) {
          for (let i = currentDocument.documents.length - 1; i >= 0; i--) {
            stack.push(currentDocument.documents[i]);
          }
        }

        await request(`/documents/${currentDocument.id}`, {
          method: "DELETE",
        });
        console.log("remove");
      }
      push("/index.html");
    },
    onRootPlus: async (id) => {
      const res = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: id,
        }),
      });
      console.log("plus");
      push(`/documents/${res.id}`);
    },
  });

  this.sendData = async () => {
    const serverData = await request("/documents", { method: "GET" });
    documentList.listSetState(serverData);
  };

  this.render = () => {
    $bodyPage.appendChild($documentListPage);
  };
}
