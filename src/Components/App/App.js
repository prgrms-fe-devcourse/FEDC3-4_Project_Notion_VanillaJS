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

export default function App({ $target }) {
  isConstructor(new.target);
  const documentList = new DocumentList({
    $target,
    initialState: getDocumentAll(),

    postDocument: async ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      const $parant = $target.closest("[data-id]");
      const $detailList = $parant.children[4];
      console.log($parant, $detailList);
      postDocument({
        title: "새로운 글 생성",
        parent: id,
      });
      $parant.removeChild($detailList);
      const initialState = await getDocumentById({ id });
      new DocumentDetailedList({
        $target: $target.closest("[data-id]"),
        initialState: await initialState.documents,
      });
    },

    deleteDocument: async ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      const $parant = $target.closest("[data-id]");
      const $detailList = $parant.children[4];
      console.log($parant, id, $detailList);
      deleteDocument({
        id,
      });
      $parant.remove();
    },

    showChildDocument: async ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      const initialState = await getDocumentById({ id });
      new DocumentDetailedList({
        $target: $target.closest("[data-id]"),
        initialState: await initialState.documents,
      });
      $target.id = "hideChildDocumentButton";
      $target.innerText = "🔼";
    },

    hideChildDocument: async ({ $target }) => {
      const $parant = $target.closest("[data-id]");
      const $detailList = $parant.children[4];
      $parant.removeChild($detailList);
      $target.id = "showChildDocumentButton";
      $target.innerText = "🔽";
    },
  });

  const documentEditor = new DocumentEditor({ $target, initialState: [] });
}
