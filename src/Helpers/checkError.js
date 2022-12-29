import { ERROR_MESSAGE } from '../Constant/error.js';

export const checkConstructor = (target) => {
  if (!target) {
    throw new Error(ERROR_MESSAGE.NOT_CONSTRUCTOR);
  }
};

export const checkString = (target) => {
  if (typeof target !== 'string') {
    throw new Error(ERROR_MESSAGE.NOT_STRING);
  }
};

export const checkNumber = (target) => {
  if (typeof Number(target) !== 'number') {
    throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  }
};

export const checkDocumentPath = (target) => {
  if (target !== 'documents') {
    throw new Error(ERROR_MESSAGE.NOT_DOCUMENTS_ROOT);
  }
};
