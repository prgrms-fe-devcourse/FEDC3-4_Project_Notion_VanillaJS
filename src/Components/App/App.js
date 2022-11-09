import { isConstructor } from "../../Helpers/checkError.js";
import {
  getDocumentAll,
  getDocumentById,
  postDocument,
  deleteDocument,
  putDocument,
} from "../../Helpers/api.js";
import DocumentList from "../DocumentList/DocumentList.js";
import DocumentDetailedList from "../DocumentList/DocumentDetailedList.js";

export default function App({ $target }) {
  isConstructor(new.target);
  const documentList = new DocumentList({
    $target,
    initialState: getDocumentAll(),
    postDocument: ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      postDocument({
        title: "새로운 글 생성",
        parent: id,
      });
    },
    deleteDocument: ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      deleteDocument({
        id,
      });
    },
    showChildDocument: async ({ $target }) => {
      const id = $target.closest("[data-id]").dataset.id;
      const initialState = await getDocumentById({ id });
      console.log($target.id);
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
      console.log($parant, $detailList);
      $parant.removeChild($detailList);
      $target.id = "showChildDocumentButton";
      $target.innerText = "🔽";
    },
  });
}
