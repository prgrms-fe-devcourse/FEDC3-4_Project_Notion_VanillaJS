import { ERROR_MESSAGE } from '../constants.js';

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const getLocalStorage = (key) => {
  try {
    const localList = JSON.parse(localStorage.getItem(key));

    if (localList) {
      return localList;
    }

    return [];
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};
