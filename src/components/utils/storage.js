/*
 * 모든 데이터가 JSON형식인 상황이기 때문에
 * storage 내부 메서드에서 JSON.stringfy, JSON.parse가 행해진다.
 */

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
