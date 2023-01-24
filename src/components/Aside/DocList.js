import { makeElement, makeList } from "../../util/templates.js";
import { hasClass, addClass, removeClass } from "../../util/helper.js";
import { session } from "../../util/storage.js";
import {
  setListScrollPos,
  goToListScrollPos,
  SET_SCROLL_POS,
  LIST_SCROLLTOP_SAVE_KEY,
} from "../../util/scrollPos.js";
import { validateState } from "../../util/validate.js";

export default function DocList({
  $target,
  initialState = (this.defaultState = {
    documents: [],
    openedDocId: "",
  }),
  onSelect,
  onAdd,
  onRemove,
}) {
  const $listContainer = makeElement("nav", "doc-list");
  $target.appendChild($listContainer);

  const $list = makeElement("ul", "root");

  this.state = initialState;

  this.setState = (nextState) => {
    try {
      validateState(nextState, this.defaultState);
      this.state = nextState;
      this.render();
    } catch (e) {
      console.error(e);
    }
  };

  this.render = () => {
    $list.innerHTML = "";
    makeList({
      $list,
      obj: this.state.documents,
      option: {
        openedDocId: this.state.openedDocId,
        type: "docList",
      },
    });
    $listContainer.appendChild($list);
    goToListScrollPos($list);
  };

  window.addEventListener(SET_SCROLL_POS, (e) => {
    let { position, calculate } = e.detail;

    /**
     * 1. calculate amount and send event
     * OR
     * 2. ask to calculate in DocList
     */

    switch (calculate) {
      case "toBottom":
        position = $list.scrollHeight;
        break;
      case "current":
        position = $list.scrollTop;
        break;
    }
    session.setItem(LIST_SCROLLTOP_SAVE_KEY, position);
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
          setListScrollPos({ position: $list.scrollTop + $li.offsetHeight });
          onAdd(documentId);
          break;
        case "remove":
          if (hasClass($li, "on")) {
            alert("Currently open! Cannot delete 🙅‍♀️");
            return;
          }
          if (confirm("Are you sure you want to delete? 🚮")) {
            setListScrollPos({ calculate: "current" });
            onRemove(documentId, this.state.openedDocId);
          }
          break;
      }
    } else if (tagName === "A" && splitedClassName === "title") {
      setListScrollPos({ calculate: "current" });
      document
        .querySelectorAll(".list-item")
        .forEach(($li) => $li.classList.remove("on"));
      onSelect(documentId);
    }
  });
}
