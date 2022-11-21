import { storage } from "./constants.js";

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
