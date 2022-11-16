import { ERROR_MESSAGE } from '../constants.js';
import { getUserIdToAdress } from './getUserIdToAdress.js';

export const initLocalStorage = (id) => {
  const getItems = localStorage.getItem(id);
  if (!getItems) {
    localStorage.setItem(id, JSON.stringify({}));
  }

  return getItems;
};

export const setLocalStorage = ({ id, value }) => {
  try {
    const userId = getUserIdToAdress();
    const localList = JSON.parse(initLocalStorage(userId));
    localList[id] = value;
    localStorage.setItem(userId, JSON.stringify(localList));
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const getLocalStorage = (id) => {
  try {
    const userId = getUserIdToAdress();
    const localList = JSON.parse(initLocalStorage(userId));

    if (localList[id]) {
      return localList[id];
    }
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const removeLocalStorage = (id) => {
  try {
    const userId = getUserIdToAdress();
    const localList = JSON.parse(initLocalStorage(userId));
    delete localList[id];
    localStorage.setItem(userId, JSON.stringify(localList));
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};
