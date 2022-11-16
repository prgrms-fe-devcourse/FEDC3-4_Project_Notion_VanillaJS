import { request } from "../../api/request.js";
import DocsList from "./DocsList.js";

export default function DocsContainer({ $target }) {
  const $docsContainer = document.createElement("aside");

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
  });

  this.setState = async () => {
    const documents = await request("/documents");
    docsList.setState(documents);
  };

  this.render = () => {
    $target.appendChild($docsContainer);
  };
  this.render();
}
