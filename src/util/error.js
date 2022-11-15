//new target
export const hasNewTarget = (target) => (target ? true : false);

//validate properties
const properties = {
  TITLE: "title",
  CONTENT: "content",
  DOCUMENTS: "documents",
};

export const hasTitle = (state) => state.hasOwnProperty(properties.TITLE);

export const hasContent = (state) => state.hasOwnProperty(properties.CONTENT);

export const hasDocuments = (state) => state.hasOwnProperty(properties.DOCUMENTS);

//string
export const isValidateString = (str) => str !== undefined && typeof str === "string";

export const isSpaceString = (str) => !str.replace(/[\s]/g, "").length;
