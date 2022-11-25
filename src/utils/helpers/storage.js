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

const modifyStorage = {
  add: id => {
    const openedDocumentItemIds = getItem(OPENED_DOCUMENT_ITEMS, []);
    if (!openedDocumentItemIds.includes(id)) {
      setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds, id]);
    }
  },
  delete: id => {
    const openedDocumentItemIds = getItem(OPENED_DOCUMENT_ITEMS, []);
    const removedOpenedDocumentItemIdIndex = openedDocumentItemIds.findIndex(
      openedDocumentItemId => openedDocumentItemId === id,
    );
    if (removedOpenedDocumentItemIdIndex !== -1) {
      openedDocumentItemIds.splice(removedOpenedDocumentItemIdIndex, 1);
    }
    setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds]);
  },
  toggle: id => {
    const openedDocumentItemIds = getItem(OPENED_DOCUMENT_ITEMS, []);
    if (openedDocumentItemIds.includes(id)) {
      const removedOpenedDocumentItemIdIndex = openedDocumentItemIds.findIndex(
        openedDocumentItemId => openedDocumentItemId === id,
      );
      if (removedOpenedDocumentItemIdIndex !== -1)
        openedDocumentItemIds.splice(removedOpenedDocumentItemIdIndex, 1);
      setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds]);
    } else {
      setItem(OPENED_DOCUMENT_ITEMS, [...openedDocumentItemIds, id]);
    }
  },
};

export { OPENED_DOCUMENT_ITEMS, getItem, setItem, modifyStorage };
