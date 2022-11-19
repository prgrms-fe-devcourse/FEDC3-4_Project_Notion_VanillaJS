import Header from "./components/Header.js";
import DocumentEditPage from "./pages/DocumentEditPage.js";

function App({ $target }) {
  new Header({ $target });
  new DocumentEditPage({ $target });
}

export default App;
