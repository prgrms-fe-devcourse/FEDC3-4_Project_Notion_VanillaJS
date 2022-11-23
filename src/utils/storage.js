const storage = window.localStorage;

export const getItemFromStorage = (key, defaultValue) => {
  try {
    const storedItem = JSON.parse(storage.getItem(key));
    return storedItem ? storedItem : defaultValue;
  } catch (e) {
    removeItemFromStorage(key);
    return defaultValue;
  }
};

export const setItemToStorage = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItemFromStorage = (key) => {
  storage.removeItem(key);
};
