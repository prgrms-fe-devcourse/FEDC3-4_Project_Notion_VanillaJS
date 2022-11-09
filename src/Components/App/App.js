import { isConstructor } from "../../Helpers/checkError.js";
import {
  getDocumentAll,
  getDocumentById,
  postDocument,
  deleteDocument,
  putDocument,
} from "../../Helpers/api.js";
import DocumentList from "../DocumentList/DocumentList.js";

export default function App({ $target }) {
  isConstructor(new.target);
  const documentList = new DocumentList({
    $target,
    initialState: getDocumentAll(),
    postDocument: () => {
      postDocument({
        title: "클릭한 아이 수정",
      });
    },
    deleteDocument: ({ $target }) => {
      const index = $target.closest("[data-id]").dataset.id;
      deleteDocument({
        id: index,
      });
    },
    showChildDocument: ({ $target }) => {
      const index = $target.closest("[data-id]").dataset.id;
      putDocument({
        id: index,
        title: "testing change",
        content: "testing change",
      });
    },
  });
}
