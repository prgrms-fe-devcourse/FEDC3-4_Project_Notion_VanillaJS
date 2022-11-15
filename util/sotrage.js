const storage = window.localStorage;

export const setStorageItem = (key, value) => {
  try{
    storage.setItem(key, JSON.stringify(value));
  } catch(e) {
    console.error('데이터 저장에 실패했습니다.')
  }
};

export const getStorageItem = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  } catch (e) {
    console.error('데이터를 읽는데 실패했습니다. 기본 값을 반환합니다.')
    return defaultValue;
  }
}