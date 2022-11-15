import DocsContainer from "./components/Documents/DocsContainer.js";

export default function App({ $target }) {
  const docsContainer = new DocsContainer({
    $target,
  });

  docsContainer.setState();
}
