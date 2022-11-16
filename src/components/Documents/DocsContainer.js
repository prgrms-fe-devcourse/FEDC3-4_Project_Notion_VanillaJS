import { request } from "../../api/request.js";
import { push } from "../utils/router/router.js";
import DocsList from "./DocsList.js";

export default function DocsContainer({ $target }) {
  const $docsContainer = document.createElement("aside");
  $docsContainer.className = "docs-container";
  $target.appendChild($docsContainer);

  const docsList = new DocsList({
    $target: $docsContainer,
    initialState: { docs: [], selectedDocs: new Set() },
    onAdd: async ({ parent, title }) => {
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
      push("/");
    },
  });

  this.setState = async () => {
    const documents = await request("/documents");
    docsList.setState({ docs: documents });
  };
}
