export const storage = (function (storage) {
    const setItem = (key, value) => {
      try {
        storage.setItem(key, value);
      } catch (e) {
        console.log(e);
      }
    };
  
    const getItem = (key) => {
      try {
        const storedValue = storage.getItem(key);
  
        if (storedValue) {
          return JSON.parse(storedValue);
        }
        return [];
      } catch (e) {
        console.log(e);
        return [];
      }
    };
  
    return {
      setItem,
      getItem,
    };
  })(window.localStorage);