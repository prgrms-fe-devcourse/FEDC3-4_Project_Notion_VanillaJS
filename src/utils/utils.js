import { DOCUMENT_ISOEPN_LOCAL_KEY } from './constants.js';
import { getItem, setItem } from './storage.js';

/**
 *
 * @param targetDocument - [{id, title, documents},{...}]
 * @returns result - [id, id...]
 */
export const getRemoveIdList = (targetDocument, result = []) => {
  targetDocument.forEach((document) => {
    const { id, documents } = document;
    result.push(id);

    if (!documents.length) {
      return result;
    }

    getRemoveIdList(documents, result);
  });

  return result;
};

export const deleteIsOpenState = (removeIdList) => {
  const currentIsOpenState = getItem(DOCUMENT_ISOEPN_LOCAL_KEY, []);
  const nextIsOpenState = currentIsOpenState.filter((id) => !removeIdList.includes(Number(id)));
  setItem(DOCUMENT_ISOEPN_LOCAL_KEY, nextIsOpenState);
};

export const $ = (selector) => {
  return document.querySelector(selector);
};

export const debounce = (executeFunction, delaySeconds) => {
  let timerId = null;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      executeFunction(...args);
    }, delaySeconds);
  };
};
