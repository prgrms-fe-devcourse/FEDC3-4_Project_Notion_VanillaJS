import { isConstructor } from "../../Helpers/checkError.js";
import {
  getDocumentAll,
  getDocumentById,
  postDocument,
  deleteDocument,
} from "../../Helpers/api.js";
import DocumentList from "../DocumentList/DocumentList.js";
import DocumentDetailedList from "../DocumentList/DocumentDetailedList.js";
import DocumentEditor from "../DocumentEditor/DocumentEditor.js";
import { documentItem } from "../DocumentList/DocumentItem.js";

export default function App({ $target }) {
  isConstructor(new.target);
  const documentList = new DocumentList({
    $target,
    initialState: getDocumentAll(),

    postDocumentEvent: async ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      const $parant = $target.closest("[data-id]");
      const $detailList = $parant.children[4];
      console.log($parant, $detailList);
      postDocument({
        title: "새로운 글 생성",
        parent: id,
      });
      if ($detailList) {
        const initialState = await getDocumentById({ id });
        const document = initialState.documents;
        $detailList.insertAdjacentHTML(
          "beforeend",
          documentItem(document[document.length - 1])
        );
      }
    },

    deleteDocumentEvent: async ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      const $parant = $target.closest("[data-id]");
      const $detailList = $parant.children[4];
      console.log($parant, id, $detailList);
      deleteDocument({
        id,
      });
      $parant.remove();
    },

    showChildDocumentEvent: async ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      const initialState = await getDocumentById({ id });
      new DocumentDetailedList({
        $target: $target.closest("[data-id]"),
        initialState: await initialState.documents,
      });
      $target.id = "hideChildDocumentButton";
      $target.innerText = "🔼";
    },

    hideChildDocumentEvent: async ({ $target }) => {
      const $parant = $target.closest("[data-id]");
      const $detailList = $parant.children[4];
      $parant.removeChild($detailList);
      $target.id = "showChildDocumentButton";
      $target.innerText = "🔽";
    },

    setEditorEvent: ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      console.log($target, id);
    },
  });

  const documentEditor = new DocumentEditor({ $target, initialState: [] });
}
