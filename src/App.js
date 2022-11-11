import DocListPage from "./components/DocListPage.js";

export default function App({ $target }) {
  
  const docListPage = new DocListPage({
    $target,
    initialState: []
  })

}