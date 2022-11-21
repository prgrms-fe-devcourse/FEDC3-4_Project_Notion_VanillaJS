const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
  try {
    const storeState = storage.getItem(key);

    if (storeState) {
      return JSON.parse(storeState);
    }
  } catch (error) {
    console.error(error);
  }
  return defaultValue;
};
export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
