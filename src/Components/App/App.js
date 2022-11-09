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
    createNewDocument: ({ $target }) => {
      const index = $target.closest("[data-id]").dataset.id;
      putDocument({
        id: index,
        title: "클릭한 아이 수정",
        content: "클릭한 아이 수정 내용",
      });
      console.log(getDocumentById({ id: index }));
      documentList.setState(getDocumentAll());
    },
    showChildDocument: ({ $target }) => {
      const index = $target.closest("[data-id]").dataset.id;
      console.log($target, "리스트 보여주기", index);
    },
  });
}
