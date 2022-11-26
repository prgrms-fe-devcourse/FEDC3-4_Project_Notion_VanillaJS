import { ERROR_NEW_KEYWORD_MISSING, idNameObj } from "../utils/constants.js";
import { hasNewTarget, isValidArray } from "../utils/error.js";
import DocumentFooter from "./DocumentFooter.js";
import DocumentHeader from "./DocumentHeader.js";
import Documents from "./Documents.js";

export default function DocumentPage({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $page = document.createElement("div");
  $page.setAttribute("id", idNameObj.SIDEBAR_CONTAINER);

  let isInit = false;

  const isValidState = (state) => {
    if (!state || !isValidArray(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : [];

  new DocumentHeader({ $target: $page });

  const documents = new Documents({
    $target: $page,
    initialState: this.state,
  });

  new DocumentFooter({ $target: $page });

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    documents.setState(this.state);

    if (!isInit) {
      this.render();
      isInit = true;
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
