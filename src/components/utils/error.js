// import { PROPERTIES } from "./constants.js";

//state properties
const PROPERTIES = {
  ID: "id",
  TITLE: "title",
  CONTENT: "content",
  DOCUMENTS: "documents",
};

const { ID, TITLE, CONTENT, DOCUMENTS } = PROPERTIES;

//properties
export const hasNewTarget = (target) => (target ? true : false);

export const hasId = (state) => state.hasOwnProperty(ID);

export const hasTitle = (state) => state.hasOwnProperty(TITLE);

export const hasContent = (state) => state.hasOwnProperty(CONTENT);

export const hasDocuments = (state) => state.hasOwnProperty(DOCUMENTS);

//type
export const isValidArray = (arr) => arr && Array.isArray(arr);
