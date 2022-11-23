import { ERROR_MESSAGE } from '../Constant/error.js';
import { getUserIdToAdress } from './getUserIdToAdress.js';

export const initBaseLocalData = (id) => {
  const getItems = localStorage.getItem(id);
  if (!getItems) {
    localStorage.setItem(id, JSON.stringify({}));
  }

  return getItems;
};

export const setItems = ({ id, value }) => {
  try {
    const userId = getUserIdToAdress();
    const localList = JSON.parse(initBaseLocalData(userId));
    localList[id] = value;
    localStorage.setItem(userId, JSON.stringify(localList));
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const getItems = (id) => {
  try {
    const userId = getUserIdToAdress();
    const localList = JSON.parse(initBaseLocalData(userId));

    if (localList[id]) {
      return localList[id];
    }
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const removeItems = (id) => {
  try {
    const userId = getUserIdToAdress();
    const localList = JSON.parse(initBaseLocalData(userId));
    delete localList[id];
    localStorage.setItem(userId, JSON.stringify(localList));
  } catch (e) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};
