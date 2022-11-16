import { request } from "../../api/request.js";
import DocsList from "./DocsList.js";

export default function DocsContainer({ $target }) {
  const $docsContainer = document.createElement("aside");
  $docsContainer.className = "docs-container";

  const docsList = new DocsList({
    $target: $docsContainer,
    initialState: [],
    onClick: async ({ parent, title }) => {
      await request("/documents", {
        method: "POST",
        body: JSON.stringify({ parent, title }),
      });
      this.setState();
    },
    onDelete: async ({ id }) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      this.setState();
    },
  });

  this.setState = async () => {
    const documents = await request("/documents");
    docsList.setState(documents);
  };

  this.render = () => {
    $target.appendChild($docsContainer);
  };
}
