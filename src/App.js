import DocumentListPage from "./components/view/DocumentListPage.js";

export default function App({ $bodyPage }) {
  const $pageTitle = document.createElement("h1");
  $pageTitle.textContent = "민형's Notion";

  $bodyPage.appendChild($pageTitle);

  new DocumentListPage({
    $bodyPage,
  });
}
