import { classNameObj, styleObj, idNameObj, ERROR_NEW_KEYWORD_MISSING } from "../utils/constants.js";
import { hasNewTarget } from "../utils/error.js";
import { routeCreateDocument } from "../utils/router.js";

const { TITLE, DOCUMENT_BLOCK_INNER, NEW_BTN } = classNameObj;
const DOCUMENT_HEADER_CONTENT = "Notion";

export default function DocumentHeader({ $target }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $header = document.createElement("div");
  $header.setAttribute("id", idNameObj.SIDEBAR_HEADER);
  $target.appendChild($header);

  const CONTENT = DOCUMENT_HEADER_CONTENT;
  const DEFAULT_PADDING = styleObj.DEFAULT_PADDING;

  this.render = () => {
    $header.innerHTML = `
      <div class="${DOCUMENT_BLOCK_INNER}" style="padding: 2px 10px 2px ${DEFAULT_PADDING}px">
        <div class="${TITLE}"> ${CONTENT} </div>
        <div class="${NEW_BTN}"></div>
      </div>
    `;
  };

  this.render();

  $header.querySelector(`.${NEW_BTN}`).addEventListener("click", () => {
    routeCreateDocument({ id: null });
  });
}
