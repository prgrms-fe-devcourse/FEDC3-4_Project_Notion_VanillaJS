const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e.message);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);

    return defaultValue;
  } catch (e) {
    console.log(e.message);
    storage.removeItem(key);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
