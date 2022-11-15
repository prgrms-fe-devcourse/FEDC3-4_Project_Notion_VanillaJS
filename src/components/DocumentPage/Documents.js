import { classNameObj, ERROR_NEW_KEYWORD_MISSING, LOCAL_STORAGE_DISPLAY, styleObj } from "../utils/constants.js";
import { hasNewTarget, isValidArray } from "../utils/error.js";
import { routeCreateDocument, routePush, routeRemoveDocument } from "../utils/router.js";
import { getItem, setItem } from "../utils/storage.js";
import {
  sidebarNewDocumentBtnClick,
  sidebarDisplayBtnClick,
  createDocumentSection,
} from "./document_util/documentUtil.js";

//constants
const {
  TITLE,
  TITLE_WRAPPER,
  DISPLAY_BTN,
  NEW_BTN,
  REMOVE_BTN,
  DOCUMENT_BLOCK,
  DOCUMENT_LIST_BLOCK,
  DOCUMENT_SECTION,
  SIDEBAR_DOCUMENT_LIST_CONTAINER,
} = classNameObj;

export default function Documents({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  //tags
  const $sidebar = document.createElement("div");
  $sidebar.setAttribute("id", SIDEBAR_DOCUMENT_LIST_CONTAINER);
  $target.appendChild($sidebar);

  //validation
  const isValidState = (state) => {
    if (!state || !isValidArray(state)) return false;
    return true;
  };

  //state
  this.state = isValidState(initialState) ? initialState : [];

  const displayArr = getItem(LOCAL_STORAGE_DISPLAY, new Map(this.state.map((document) => [document.id, false])));

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sidebar.innerHTML = `
      ${this.state
        .map((rootDocument) => createDocumentSection(rootDocument, styleObj.DEFAULT_PADDING, displayArr))
        .join("")}
    `;
  };

  this.render();

  //event handlers
  $sidebar.addEventListener("click", (e) => {
    const { target } = e;
    const { classList } = target;
    const { id } = target.closest(`.${DOCUMENT_BLOCK}`).dataset;
    const documentSection = target.closest(`.${DOCUMENT_SECTION}`);

    if (classList[0] === TITLE || classList[0] === TITLE_WRAPPER) {
      const parentId = documentSection.parentNode.dataset.id;

      routePush(`/documents/${id}${parentId ? `?parent.id=${parentId}` : ""}`);
    } else if (classList[0] === DISPLAY_BTN) {
      sidebarDisplayBtnClick(id, target, displayArr);
    } else if (classList[0] === NEW_BTN) {
      sidebarNewDocumentBtnClick(id, target);

      //펼침 적용
      if (documentSection) {
        const documentListBlock = documentSection.querySelector(`.${DOCUMENT_LIST_BLOCK}`);

        displayArr[id] = true;
        setItem(LOCAL_STORAGE_DISPLAY, displayArr);
        documentListBlock.style.display = "block";
      }

      routeCreateDocument({ id });
    } else if (classList[0] === REMOVE_BTN) {
      const parentId = documentSection.parentNode.dataset.id;
      routeRemoveDocument({ id, parentId });
    }
  });
}
