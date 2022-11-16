const storage = window.localStorage;

const OPENED_DOCUMENT_ITEMS = 'openedDocumentItems';

const getItem = (key, defaultValue) => {
  try {
    const storedValue = JSON.parse(storage.getItem(key));

    return storedValue ? storedValue : defaultValue;
  } catch (error) {
    console.log(error.message);
    return defaultValue;
  }
};

const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    console.log(error.message);
  }
};

export { OPENED_DOCUMENT_ITEMS, getItem, setItem };
