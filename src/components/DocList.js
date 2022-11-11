import { makeLi, makeUl } from "./util/templates.js";
import { hasClass, addClass, removeClass } from "./util/helper.js";

export default function DocList({
  $target,
  initialState,
  onSelect,
  onAdd,
  onRemove,
}) {
  const $listContainer = document.createElement("div");
  $target.appendChild($listContainer);

  const $list = makeUl("root");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    createList($list, this.state);
    $listContainer.appendChild($list);
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

  $list.addEventListener("click", (e) => {
    const $li = e.target.closest(".doc-item");
    if (!$li) return;
    console.log($li);

    const { documentId } = $li.dataset;
    const { className } = e.target;
    if (className === "remove") {
      if (hasClass($li, "on")) return; //block if open in editor
      onRemove(documentId);
    } else if (className === "add") {
      const $parent = $li.closest(".parent");
      if (!$parent) onAdd(documentId); //add under root doc

      const { parentId } = $parent.dataset;
      onAdd(parentId); //add under parent doc
    } else {
      addClass($li, 'on');
      onSelect(documentId)
    }
  });
}
