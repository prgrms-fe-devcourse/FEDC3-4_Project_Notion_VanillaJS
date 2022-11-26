const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e.message);
  }
};

export const getItem = (key, defaultReturnValue) => {
  try {
    const storedValue = storage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : defaultReturnValue;
  } catch (e) {
    return defaultReturnValue;
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
