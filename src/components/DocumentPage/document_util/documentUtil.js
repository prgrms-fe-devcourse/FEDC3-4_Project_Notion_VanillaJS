import { setItem } from "../../utils/storage.js";
import { classNameObj, styleObj, DEFAULT_TITLE, DEFAULT_ID, LOCAL_STORAGE_DISPLAY } from "../../utils/constants.js";

//constants
const {
  TITLE,
  DISPLAY_BTN,
  NEW_BTN,
  REMOVE_BTN,
  DOCUMENT_BLOCK,
  DOCUMENT_BLOCK_INNER,
  DOCUMENT_LIST_BLOCK,
  DOCUMENT_SECTION,
} = classNameObj;

const { PADDING_INCREMENT } = styleObj;

//method
export const createDocumentBlock = (id, title, padding) => {
  return `
    <div data-id=${id} class="${DOCUMENT_BLOCK}">
      <div class="${DOCUMENT_BLOCK_INNER}" style="padding: 2px 10px 2px ${padding}px">
        <div class="${DISPLAY_BTN}"></div>
        <div class="title-wrapper">
          <div class="${TITLE}">${title}</div>
        </div>
        <div class="${REMOVE_BTN}"></div>
        <div class="${NEW_BTN}"></div>
      </div>
    </div>
  `;
};

export const createDocumentSection = (parentDocument, padding, displayArr) => {
  const { id, title, documents } = parentDocument;

  if (id && title !== undefined) {
    return `
    <div class="${DOCUMENT_SECTION}">
      ${createDocumentBlock(id, title, padding)}
      ${
        documents.length
          ? `
              <div data-id="${id}" class="${DOCUMENT_LIST_BLOCK}"
                   style="display:${displayArr[id] ? "block" : "none"}">
                    ${documents
                      .map((document) => createDocumentSection(document, padding + PADDING_INCREMENT, displayArr))
                      .join("")}
              </div>
            `
          : ""
      }
    </div>
    `;
  }
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

export const sidebarDisplayBtnClick = (id, target, displayArr) => {
  const documentListBlock = target.closest(`.${DOCUMENT_SECTION}`).querySelector(`.${DOCUMENT_LIST_BLOCK}`);

  if (!documentListBlock) return;

  const { display } = documentListBlock.style;

  if (display === "none") {
    displayArr[id] = true;
    documentListBlock.style.display = "block";
  } else {
    displayArr[id] = false;
    documentListBlock.style.display = "none";
  }
  setItem(LOCAL_STORAGE_DISPLAY, displayArr);
};

const addNewDocumentBlock = (documentListBlock, paddingLeft) => {
  //document-list-block 가져와서 맨 마지막에 document-block 삽입하기
  //낙관적 업데이트로 보여주기
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

//document-list가 없어서 새로 생성해야 하는 경우
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

const sidebarSubDocumentBtnClick = (id, documentListBlock, paddingLeft, target) => {
  if (documentListBlock) {
    addNewDocumentBlock(documentListBlock, paddingLeft);
  } else {
    const documentListAddBlock = target.closest(`.${DOCUMENT_SECTION}`);
    addNewDocumentList(id, documentListAddBlock, paddingLeft);
  }
};

export const sidebarNewDocumentBtnClick = (id, target) => {
  const documentListBlock = target.closest(`.${DOCUMENT_SECTION}`).querySelector(`.${DOCUMENT_LIST_BLOCK}`);
  const { paddingLeft } = target.closest(`.${DOCUMENT_BLOCK_INNER}`).style;
  sidebarSubDocumentBtnClick(id, documentListBlock, paddingLeft, target);
};
