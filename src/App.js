import DocListPage from "./components/Aside/DocListPage.js";
import DocEditPage from "./components/Main/DocEditPage.js";

export default function App({ $target }) {

  const docListPage = new DocListPage({
    $target,
    initialState: []
  })

  // const docEditPage = new DocEditPage({
  //   $target
  // })
}