import { makeLi, makeUl } from "./util/templates.js";

export default function DocList({ $target, initialState }) {
  const $listContainer = document.createElement("div");
  $target.appendChild($listContainer);

  const $list = makeUl('root');

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
        const { documents } = value;
        const $li = makeLi(value);
        const hasChild = documents.length > 0;

        if (hasChild) {
          const $ul = makeUl('parent');
          createList($ul, documents);
          $li.appendChild($ul);
        }
        $target.appendChild($li);
      }
    });
  };
}
