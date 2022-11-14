import Header from "./components/Header.js";
import DocumentEditPage from "./pages/DocumentEditPage.js";

console.log("app is running~");

function App({ $target }) {
  new Header({ $target });
  new DocumentEditPage({ $target });
}

export default App;
