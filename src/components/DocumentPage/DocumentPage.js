import {
  ERROR_NEW_KEYWORD_MISSING,
  LOCAL_IS_GOING_TO_PUT,
  LOCAL_IS_PUTTING_OKAY,
  LOCAL_IS_WAITING_USER_ANSWER,
} from "../utils/constants.js";
import { hasNewTarget, isValidArray } from "../utils/error.js";
import { routePush } from "../utils/router.js";
import { getItem, setItem } from "../utils/storage.js";
import DocumentFooter from "./DocumentFooter.js";
import DocumentHeader from "./DocumentHeader.js";
import Documents from "./Documents.js";

export default function DocumentPage({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  //tags
  const $page = document.createElement("div");
  $page.setAttribute("id", "sidebar-container");

  let isInit = false;

  //validation
  const isValidState = (state) => {
    if (!state || !isValidArray(state)) return false;
    return true;
  };

  //state
  this.state = isValidState(initialState) ? initialState : [];

  //components
  new DocumentHeader({ $target: $page });

  const documents = new Documents({
    $target: $page,
    initialState: this.state,
    onClick: async ({ id, parentId }) => {
      const isGoingToPut = getItem(LOCAL_IS_GOING_TO_PUT, false);

      setItem(LOCAL_IS_WAITING_USER_ANSWER, true);
      if (!isGoingToPut || confirm("변경사항이 저장되지 않을 수 있습니다.")) {
        setItem(LOCAL_IS_PUTTING_OKAY, !isGoingToPut);
        routePush(
          `/documents/${id}${parentId ? `?parent.id=${parentId}` : ""}`
        );
      }
      setItem(LOCAL_IS_WAITING_USER_ANSWER, false);
    },
  });

  new DocumentFooter({ $target: $page });

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    //document set state
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
