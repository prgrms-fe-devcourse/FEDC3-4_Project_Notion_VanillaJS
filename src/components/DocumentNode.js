import { navigate } from "../utils/router.js";
import { className } from "../utils/constants.js";

function DocumentNode({ $target, initialState, onClick, onDelete }) {
  const $node = document.createElement("article");
  $target.appendChild($node);

  const { addButton, deleteButton } = className;

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
            <section class="tree-node-li">
              <div class="node-title">
                <span class="material-symbols-outlined">keyboard_arrow_right</span>
                <span>${title}</span>
              </div>
              <div class="node-button-group">
                <button class="${deleteButton}" data-parent-id="${id}">
                  <span class="material-symbols-outlined">
                    more_horiz
                  </span>
                </button>
                <button class="${addButton}" data-parent-id="${id}">
                  <span class="material-symbols-outlined">
                    add
                  </span>
                </button>
              </div>
            </section>
            `;

            if (documents.length > 0) {
              this.documentNode = new DocumentNode({
                $target: $li,
                initialState: {
                  data: documents,
                },
              });
            }

            return $li.outerHTML;
          })
          .join("")}
        </ul>
      `;
  };

  this.render();

  const onClickButton = ($button) => {
    const { className } = $button;
    const { parentId } = $button.dataset;

    if (!parentId) {
      return;
    }

    if (className === addButton) {
      onClick(parseInt(parentId));
      return;
    }

    if (className === deleteButton) {
      onDelete(parseInt(parentId));
      return;
    }
  };

  const onSelectDocument = ($li) => {
    const { documentId } = $li.dataset;

    if (documentId) {
      navigate(`/document/${documentId}`);
    }
  };

  $node.addEventListener("click", (e) => {
    const $button = e.target.closest("button");

    if ($button) {
      onClickButton($button);
      return;
    }

    const $li = e.target.closest("li");

    if ($li) {
      onSelectDocument($li);
      return;
    }
  });
}

export default DocumentNode;
