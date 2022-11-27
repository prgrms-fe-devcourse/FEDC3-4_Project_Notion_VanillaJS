import DocumentList from "../common/DocumentList.js";
import { request } from "../../js/api.js";
import { push } from "../../router/router.js";

export default function DocumentListPage({ $bodyPage, initialState }) {
  const $documentListPage = document.createElement("div");
  $documentListPage.classList.add("list-container");

  // by 민형, Editor에서 입력할 때 마다 initialState에 수정된 데이터가 전달됨_221116
  // Editor에 입력시 list에 바로 반영되는 기능 구현에만 사용 => 상관없이 사용(221127)
  this.documentListState = initialState;

  this.documentListSetState = (nextState) => {
    this.documentListState = nextState;

    documentList.listSetState({
      originEdit: this.documentListState.originEdit,
      updateEdit: this.documentListState.updateEdit,
    });

    this.render();
  };

  const documentList = new DocumentList({
    $documentListPage,
    initialState: {
      originEdit: this.documentListState.originEdit,
      updateEdit: this.documentListState.updateEdit,
    },
    onPlus: async (id) => {
      const res = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "",
          parent: id,
        }),
      });
      push(`/documents/${res.id}`);
    },
    onRemove: async (id) => {
      const removeDocument = await request(`/documents/${id}`, {
        method: "GET",
      });
      const stack = [removeDocument];

      while (stack.length > 0) {
        const currentDocument = stack.pop();

        await request(`/documents/${currentDocument.id}`, {
          method: "DELETE",
        });

        // by 민형, 현재 document의 자식 document가 있다면 stack에 추가_221113
        if (!currentDocument.documents) continue;
        for (let i = currentDocument.documents.length - 1; i >= 0; i--) {
          stack.push(currentDocument.documents[i]);
        }
      }
      push("/");
    },
  });

  this.render = () => {
    $bodyPage.appendChild($documentListPage);
  };
}
