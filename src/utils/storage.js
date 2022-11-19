const storage = window.localStorage;

const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(error.message);
  }
};

const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export { getItem, setItem };
