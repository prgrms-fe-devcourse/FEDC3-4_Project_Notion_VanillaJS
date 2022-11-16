import { ERROR_MESSAGE } from '../constants.js';

export const isConstructor = (target) => {
  if (!target) {
    throw new Error(ERROR_MESSAGE.NOT_CONSTRUCTOR);
  }
};

export const isString = (target) => {
  if (typeof target !== 'string') {
    throw new Error(ERROR_MESSAGE.NOT_STRING);
  }
};

export const isNumber = (target) => {
  if (typeof Number(target) !== 'number') {
    throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  }
};

export const checkDocumentPath = (target) => {
  if (target !== 'documents') {
    throw new Error(ERROR_MESSAGE.NOT_DOCUMENTS_ROOT);
  }
};
