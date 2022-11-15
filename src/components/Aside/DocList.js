import { makeLi, makeUl, makeElement } from "../../util/templates.js";
import { hasClass, addClass, removeClass } from "../../util/helper.js";
import { session } from "../../util/storage.js";

export default function DocList({
  $target,
  initialState = {
    documents: [],
    openedDocId,
  },
  onSelect,
  onAdd,
  onRemove,
}) {
  const $listContainer = makeElement("nav", "doc-list");
  $target.appendChild($listContainer);

  const $list = makeUl("root");
  const LIST_SCROLLTOP_SAVE_KEY = "listScrollPos";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    $list.innerHTML = "";
    createList($list, this.state.documents);
    $listContainer.appendChild($list);
    goToListScrollPos();
  };

  const createList = ($target, obj) => {
    if (typeof obj !== "object" || obj === null) return;

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object" && key !== "documents") {
        const { documents, id } = value;
        const $li = makeLi(value);

        if (this.state.openedDocId === id.toString()) {
          addClass($li, "on");
        }

        const hasChild = documents.length > 0;
        if (hasChild) {
          const $ul = makeUl("parent");
          $ul.dataset.parentId = id;
          createList($ul, documents);

          if ($ul.querySelector("li.on")) {
            addClass($ul, "on");
          }

          $li.appendChild($ul);
        }
        $target.appendChild($li);
      }
    });
  };

  const goToListScrollPos = () => {
    var listScrollPos = session.getItem(LIST_SCROLLTOP_SAVE_KEY, 0);
    if (listScrollPos > 0) {
      console.log(listScrollPos);
      $list.scrollTo(0, listScrollPos);
      session.removeItem(LIST_SCROLLTOP_SAVE_KEY);
    }
  };

  window.addEventListener("beforeunload", () => {
    session.setItem(LIST_SCROLLTOP_SAVE_KEY, $list.scrollTop);
  });

  $listContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const $li = e.target.closest(".list-item");
    if (!$li) return;

    const { documentId } = $li.dataset;

    const $target = e.target;
    const { tagName, className } = $target;
    const splitedClassName = className
      .split(" ")
      .filter((x) => !x.startsWith("xi"))
      .shift();

    if (tagName === "I") {
      switch (splitedClassName) {
        case "view-more":
          const $parent = $li.querySelector(".parent");
          if (!$parent) return;

          if (hasClass($parent, "on")) {
            removeClass($target, "on");
            removeClass($parent, "on");
          } else {
            addClass($target, "on");
            addClass($parent, "on");
          }
          break;
        case "add":
          onAdd(documentId);
          break;
        case "remove":
          if (hasClass($li, "on")) {
            alert('Currently open! Cannot delete 🙅‍♀️');
            return;
          }
          if(confirm('Are you sure you want to delete? 🚮')) onRemove(documentId);
          break;
      }
    } else if (tagName === "A" && splitedClassName === "title") {
      document
        .querySelectorAll(".list-item")
        .forEach(($li) => $li.classList.remove("on"));
      onSelect(documentId);
    }
  });
}

/* To do:
- stay on current doc tab during setState -> state variable for currently open needed
*/
