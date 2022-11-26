import {
  classNameObj,
  ERROR_NEW_KEYWORD_MISSING,
  LOCAL_STORAGE_DISPLAY,
  SLASH_DOCUMENTS,
  styleObj,
} from "../utils/constants.js";
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
  SCROLLBAR,
} = classNameObj;

export default function Documents({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $sidebar = document.createElement("div");
  $sidebar.setAttribute("id", SIDEBAR_DOCUMENT_LIST_CONTAINER);
  $sidebar.setAttribute("class", SCROLLBAR);
  $target.appendChild($sidebar);

  const isValidState = (state) => {
    if (!state || !isValidArray(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : [];

  const openDocumentsList = getItem(LOCAL_STORAGE_DISPLAY, new Map(this.state.map((document) => [document.id, false])));

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sidebar.innerHTML = `
      ${this.state
        .map((rootDocument) => createDocumentSection(rootDocument, styleObj.DEFAULT_PADDING, openDocumentsList))
        .join("")}
    `;
  };

  this.render();

  $sidebar.addEventListener("click", (e) => {
    const { target } = e;
    const { classList } = target;
    const { id } = target.closest(`.${DOCUMENT_BLOCK}`).dataset;
    const documentSection = target.closest(`.${DOCUMENT_SECTION}`);
    const parentId = documentSection.parentNode.dataset.id;

    if (classList[0] === TITLE || classList[0] === TITLE_WRAPPER) {
      routePush(`${SLASH_DOCUMENTS}/${id}`, parentId);
    } else if (classList[0] === DISPLAY_BTN) {
      sidebarDisplayBtnClick(id, target, openDocumentsList);
    } else if (classList[0] === NEW_BTN) {
      //낙관적 업데이트
      sidebarNewDocumentBtnClick(id, target);

      //펼침 적용
      if (documentSection) {
        const documentListBlock = documentSection.querySelector(`.${DOCUMENT_LIST_BLOCK}`);

        openDocumentsList[id] = true;
        setItem(LOCAL_STORAGE_DISPLAY, openDocumentsList);
        documentListBlock.style.display = "block";
      }

      routeCreateDocument({ id });
    } else if (classList[0] === REMOVE_BTN) {
      routeRemoveDocument({ id, parentId });
    }
  });
}
