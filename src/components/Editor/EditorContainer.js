import EditorPage from "./EditorPage.js";
import { request } from "../../api/request.js";
import { push } from "../utils/router/router.js";

export default function EditorContainer({ $target, onChange }) {
  const $editorContainer = document.createElement("main");
  $editorContainer.className = "editor-container";
  $target.appendChild($editorContainer);

  let timer = null;

  this.state = {
    id: null,
  };

  const $ediotr = new EditorPage({
    $target: $editorContainer,
    initialState: { title: "", content: "" },
    // debounce
    onEditing: ({ title, content }) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        if (this.state.id === "new") {
          // 새로운 문서 작성
          const res = await request("/documents", {
            method: "POST",
            body: JSON.stringify({ title, parent: null }),
          });
          if (res) {
            this.state = res;
            push(`/documents/${this.state.id}`);
          } else {
            throw new Error("Post method failed");
          }
        } else {
          // 기존 문서 수정
          await request(`/documents/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
          });
          onChange();
        }
      }, 1500);
    },
  });

  this.setState = async (selectedDoc) => {
    const id = selectedDoc?.id;
    if (!id) {
      this.state = { id: "new" };
      $ediotr.setState({ title: "", content: "" });
    } else {
      this.state = selectedDoc;
      const doc = await request(`/documents/${id}`);
      $ediotr.setState(doc);
    }
  };
}
