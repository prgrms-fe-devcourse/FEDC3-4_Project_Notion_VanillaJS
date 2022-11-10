export const isNew = (isNew) => {
  try {
    if (!isNew) {
      throw new Error('new 없이 호출됨');
    }
  } catch (e) {
    console.error(e);
  }
};
