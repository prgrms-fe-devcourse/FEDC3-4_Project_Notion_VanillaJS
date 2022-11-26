import { hasId, hasNewTarget } from "../utils/error.js";
import { DISABLED_ID, ERROR_NEW_KEYWORD_MISSING, classNameObj } from "../utils/constants.js";
import DeleteButton from "../Button/DeleteButton.js";

export default function Topbar({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $topbar = document.createElement("div");
  $topbar.setAttribute("class", classNameObj.EDITOR_TOPBAR);
  $target.appendChild($topbar);

  const isValidState = (state) => {
    if (!state || !hasId(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { id: DISABLED_ID };

  const deleteBtn = new DeleteButton({
    $target: $topbar,
    initialState: {},
  });

  this.setState = (nextState) => {
    if (!nextState) return;

    this.state = nextState;
    deleteBtn.setState(this.state);
  };
}
