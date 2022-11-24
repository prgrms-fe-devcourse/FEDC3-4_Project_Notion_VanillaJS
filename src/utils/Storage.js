const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);
    return defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e.message);
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
