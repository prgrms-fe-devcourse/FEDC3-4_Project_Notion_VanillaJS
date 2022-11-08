import { I_ERROR_MESSAGE } from "../constants.js";
import { checkLocalData } from "./checkError.js";

export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    throw new Error(I_ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};

export const getItem = (key) => {
  try {
    const localList = JSON.parse(window.localStorage.getItem(key));

    if (localList) {
      checkLocalData(localList);
      return localList;
    }

    return [];
  } catch (e) {
    throw new Error(I_ERROR_MESSAGE.NOT_VALID_LOCALDATA, e);
  }
};
