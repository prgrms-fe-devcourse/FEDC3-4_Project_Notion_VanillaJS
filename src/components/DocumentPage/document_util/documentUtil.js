import { setItem } from "../../utils/storage.js";
import { classNameObj, styleObj, DEFAULT_TITLE, DEFAULT_ID, LOCAL_STORAGE_DISPLAY } from "../../utils/constants.js";

//constants
const {
  TITLE,
  TITLE_WRAPPER,
  BTN_WRAPPER,
  DISPLAY_BTN,
  NEW_BTN,
  REMOVE_BTN,
  DOCUMENT_BLOCK,
  DOCUMENT_BLOCK_INNER,
  DOCUMENT_LIST_BLOCK,
  DOCUMENT_SECTION,
} = classNameObj;

const { PADDING_INCREMENT } = styleObj;

//private method
const createDocumentBlock = (id, title, padding) => {
  return `
    <div data-id=${id} class="${DOCUMENT_BLOCK}">
      <div class="${DOCUMENT_BLOCK_INNER}" style="padding: 2px 10px 2px ${padding}px">
        <div class="${DISPLAY_BTN}"></div>
        <div class="${TITLE_WRAPPER}">
          <div class="${TITLE}">${title || DEFAULT_TITLE}</div>
        </div>
        <div class="${BTN_WRAPPER}">
          <div class="${REMOVE_BTN}"></div>
          <div class="${NEW_BTN}"></div>
        </div>
      </div>
    </div>
  `;
};

const createNewHTML = (origin, documentArgs) => {
  const { id, title, padding } = documentArgs;

  return `
    ${origin}
    <div class="${DOCUMENT_SECTION}">
      ${createDocumentBlock(id, title, padding)}
    </div>
  `;
};

const addNewDocumentBlock = (documentListBlock, paddingLeft) => {
  const innerTags = documentListBlock.innerHTML;

  documentListBlock.innerHTML = `
    ${createNewHTML(innerTags.substring(0, innerTags.length - 5), {
      id: DEFAULT_ID,
      title: DEFAULT_TITLE,
      padding: parseInt(paddingLeft.substring(0, paddingLeft.length - 2)) + PADDING_INCREMENT,
    })}
    </div>
  `;
};

const addNewDocumentList = (id, documentListAddBlock, paddingLeft) => {
  const origin = `
    ${documentListAddBlock.innerHTML}
    <div data-id="${id}" class="${DOCUMENT_LIST_BLOCK}" style="display:block">
  `;

  documentListAddBlock.innerHTML = `
    ${createNewHTML(origin, {
      id: DEFAULT_ID,
      title: DEFAULT_TITLE,
      padding: parseInt(paddingLeft.substring(0, paddingLeft.length - 2)) + PADDING_INCREMENT,
    })}
    </div>
  `;
};

//public method
export const createDocumentSection = (parentDocument, padding, openDocumentsList) => {
  const { id, title, documents } = parentDocument;

  if (id && title !== undefined) {
    return `
    <div class="${DOCUMENT_SECTION}">
      ${createDocumentBlock(id, title, padding)}
      ${
        documents.length
          ? `
              <div data-id="${id}" class="${DOCUMENT_LIST_BLOCK} ${openDocumentsList[id] ? "block" : "none"}">
                    ${documents
                      .map((document) =>
                        createDocumentSection(document, padding + PADDING_INCREMENT, openDocumentsList)
                      )
                      .join("")}
              </div>
            `
          : ""
      }
    </div>
    `;
  }
};

export const sidebarDisplayBtnClick = (id, target, openDocumentsList) => {
  const documentListBlock = target.closest(`.${DOCUMENT_SECTION}`).querySelector(`.${DOCUMENT_LIST_BLOCK}`);

  if (!documentListBlock) return;

  const { classList } = documentListBlock;

  if (classList.contains("none")) {
    openDocumentsList[id] = true;
    classList.remove("none");
    classList.add("block");
  } else {
    openDocumentsList[id] = false;
    classList.remove("block");
    classList.add("none");
  }
  setItem(LOCAL_STORAGE_DISPLAY, openDocumentsList);
};

export const sidebarNewDocumentBtnClick = (id, target) => {
  const documentListBlock = target.closest(`.${DOCUMENT_SECTION}`).querySelector(`.${DOCUMENT_LIST_BLOCK}`);
  const { paddingLeft } = target.closest(`.${DOCUMENT_BLOCK_INNER}`).style;

  if (documentListBlock) {
    addNewDocumentBlock(documentListBlock, paddingLeft);
  } else {
    const documentListAddBlock = target.closest(`.${DOCUMENT_SECTION}`);

    addNewDocumentList(id, documentListAddBlock, paddingLeft);
  }
};
