import DocumentPage from "./DocumentPage.js";
import EditorPage from "./EditorPage.js";

export default function App({ $target }) {
  const documentPage = new DocumentPage({
    $target,
  });

  const editorPage = new EditorPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: "",
        content: "",
      },
    },
  });

  documentPage.setState();
}
