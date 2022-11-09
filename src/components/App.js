import DirectoryPage from "./DirectoryPage.js";
import EditorPage from "./EditorPage.js";

export default function App({ $target }) {
  const directoryPage = new DirectoryPage({
    $target,
  });

  new EditorPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });
}
