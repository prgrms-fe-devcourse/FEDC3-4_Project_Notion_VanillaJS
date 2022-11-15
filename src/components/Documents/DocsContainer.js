import { request } from "../../api/request.js";
import DocsList from "./DocsList.js";

export default function DocsContainer({ $target }) {
  const $docsContainer = document.createElement("aside");

  const docsList = new DocsList({
    $target: $docsContainer,
    initialState: [],
  });

  this.setState = async () => {
    // const documents = await request("/documents");
    const documents = [
      {
        id: 1,
        title: "노션을 만들자",
        documents: [
          {
            id: 2,
            title: "블라블라",
            documents: [
              {
                id: 3,
                title: "함냐함냐",
                documents: [],
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "hello!",
        documents: [],
      },
    ];
    docsList.setState(documents);
    this.render();
  };

  this.render = () => {
    $target.appendChild($docsContainer);
  };
}
