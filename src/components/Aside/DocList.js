import { makeLi, makeUl, makeElement } from "../../util/templates.js";
import { hasClass, addClass, removeClass } from "../../util/helper.js";

export default function DocList({
  $target,
  initialState,
  onSelect,
  onAdd,
  onRemove,
}) {
  const $listContainer = makeElement('nav', 'doc-list');
  $target.appendChild($listContainer);
  const $list = makeUl("root");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $list.innerHTML = '';
    createList($list, this.state);
    $listContainer.appendChild($list)
  };

  const createList = ($target, obj) => {
    if (typeof obj !== "object" || obj === null) return;

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object" && key !== "documents") {
        const { documents, id } = value;
        const $li = makeLi(value);
        const hasChild = documents.length > 0;

        if (hasChild) {
          const $ul = makeUl("parent");
          $ul.dataset.parentId = id;
          createList($ul, documents);
          $li.appendChild($ul);
        }
        $target.appendChild($li);
      }
    });
  };

  this.render()

  $listContainer.addEventListener("click", (e) => {
    const $li = e.target.closest(".list-item");
    if (!$li) return;

    const { documentId } = $li.dataset;
    const $button = e.target.closest('button');
    const { className } = $button;

    if (className === "remove") {
      if (hasClass($li, "on")) return; //block if open in editor
      onRemove(documentId);
    } else if (className === "add") {
      onAdd(documentId)
    } else {
      document.querySelectorAll('.list-item').forEach($li => $li.classList.remove('on'));
      addClass($li, 'on');
      onSelect(documentId)
    }
  });
}
