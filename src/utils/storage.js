const storage = window.localStorage;

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
