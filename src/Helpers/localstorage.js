import { ERROR_MESSAGE } from '../constants.js';
import { getUserId } from './getUserId.js';

export const initLocalStorage = (id) => {
  const getItems = localStorage.getItem(id);
  if (!getItems) {
    localStorage.setItem(id, JSON.stringify({}));
  }
  return getItems;
};

export const setLocalStorage = ({ id, value }) => {
  try {
    const userId = getUserId();
    const item = initLocalStorage(userId);
    const localList = JSON.parse(item);
    localList[id] = value;
    localStorage.setItem(userId, JSON.stringify(localList));
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const getLocalStorage = (id) => {
  try {
    const userId = getUserId();
    const item = initLocalStorage(userId);
    const localList = JSON.parse(item);

    if (localList[id]) {
      return localList[id];
    }

    return;
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const removeLocalStorage = (id) => {
  try {
    const userId = getUserId();
    const item = initLocalStorage(userId);
    const localList = JSON.parse(item);
    delete localList[id];
    localStorage.setItem(userId, JSON.stringify(localList));
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};
