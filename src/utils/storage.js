const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getItem = (key, defaultValue) => {
  const storedValue = JSON.parse(storage.getItem(key)) || defaultValue;
  return storedValue;
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (error) {
    throw new Error(error.message);
  }
};
