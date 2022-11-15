import { navigate } from "../utils/router.js";

function DocumentNode({ $target, initialState, onClick, onSelect }) {
  const $node = document.createElement("article");
  $target.appendChild($node);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { data } = this.state;

    $node.innerHTML = `
      <ul class="tree-node">
        ${data
          .map(({ id, title, documents }) => {
            const $li = document.createElement("li");
            $li.dataset.documentId = id;
            $li.className = "node-item";
            $li.innerHTML = `
            ${title}${id}
            <button class="add-button" data-parent-id="${id}">+</button>
            `;

            if (documents.length > 0) {
              new DocumentNode({
                $target: $li,
                initialState: { data: documents },
              });
            }

            return $li.outerHTML;
          })
          .join("")}
        </ul>
      `;
  };

  this.init = () => {
    this.render();
  };

  this.init();

  $node.addEventListener("click", (e) => {
    const $button = e.target.closest("button");

    if ($button?.className === "add-button") {
      const { parentId } = $button.dataset;

      if (parentId) {
        onClick(parseInt(parentId));
      }
      return;
    }

    const $li = e.target.closest("li");

    if ($li) {
      const { documentId } = $li.dataset;
      // 여기서 라우터 변경을 한 후 이동한 페이지에서 api 요청해서 문서 정보 불러오기
      if (documentId) {
        onSelect(parseInt(documentId));
        navigate(`/document/${documentId}`);
      }
    }
  });
}

export default DocumentNode;
